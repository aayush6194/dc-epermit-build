export type ValueType = 'DOUBLE' | 'INT';

//not exhaustive here list below; more will be added later
export type Unit = '%' | 'none' | 'cents';

export type ResourceType = 'garage' | 'event' | 'enterpriseUser' | 'announcement' | 'citation';

export const IntervalPreset_E = {
  'last_7_days': 'last_7_days',
  'last_30_days': 'last_30_days',
  'last_90_days': 'last_90_days', 
  'last_365_days': 'last_365_days', 
  'current_month': 'current_month', 
  'last_month': 'last_month', 
  'year_to_date': 'year_to_date', 
  'today': 'today', 
  'custom': 'custom'
} as const;

export declare namespace TimeSeries {
  export type ReducerFunction = 'MEAN' | 'MAX' | 'MIN' | 'COUNT' | 'SUM';

  export type CrossSeriesReducerFunction = ReducerFunction | 'NONE';

  export type AlignmentPeriod = '5m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1m';

  export type IntervalPreset = (typeof IntervalPreset_E)[keyof typeof IntervalPreset_E];

  export type Point = {
    at: Date,
    isMissing: boolean, 
    value: number 
  };

  export type Points = Point[];

  export interface MetricDescriptor {
    displayName: string;
    description: string;

    //this is a unique field
    type: string;

    applicableResource: ResourceType;
    valueType: ValueType;
    unit: Unit;
  
    maxAlignmentPeriod: AlignmentPeriod;
    minAlignmentPeriod: AlignmentPeriod;
  
    defaultAlignmentReducer: ReducerFunction;
  }
  
  export interface TimeSeries {
  
    //null if it is crossSeriesReduced time series
    resourceId: string | null,
  
    displayLabel: string,
  
    //See https://cloud.google.com/monitoring/api/ref_v3/rest/v3/TimeInterval for interval
    //if `isMissing` is true, then `value`should be ignored; this booelan field allows for
    //uniform interval across time series. A timeSeries is guaranteed to have atleast one or more
    //`isMissing: false` point. for gauge metric kind, startTime and endTime are same
    points: Points
  }

  export interface DayFilterQuery {
    /*0th is sunday and 6th is saturday*/
    days: boolean[];
    /*
      hours should be between 0 and 24
      it is parsed as (start, end]
      
      e.g. hours: [8, 9] => (8, 9]    //everything between 8:01  and 9:00
        hours: [0, 24] => (0, 24]     //everything between 00:01 and 24:00
    */
    hours: [number, number];
  }
  
  export interface Query {
    metricType: string,
  
    //If missing, returns time series for all the resources.
    //Empty array is taken as missing.
    //If one or more resource_ids dont match, just ignores them.
    //resource type is assumed to be one mentioned in MetricDescriptor.
    resourceIds?: string[],

    alignment?: {
      alignmentPeriod: AlignmentPeriod;
      alignmentReducer: ReducerFunction;
    }

    dayFilter?: DayFilterQuery;

    crossSeriesReducer: CrossSeriesReducerFunction;

    intervalPreset: IntervalPreset;

    customInterval?: { startTime: Date, endTime: Date };
  }

  export interface ParsedTimeSeriesQuery {
    metricType: string,
  
    resourceIds?: string[],

    alignment?: {
      alignmentPeriod: AlignmentPeriod;
      alignmentReducer: ReducerFunction;
    }

    dayFilter?: DayFilterQuery;

    crossSeriesReducer: CrossSeriesReducerFunction;

    interval: { startTime: Date, endTime: Date };
  }
  
  export interface Result {
  
    metricType: string;
  
    unit: Unit;
  
    //buckets individual timeSeries into following interval
    //bigger alignmentPeriod means bigger bucket size
    //automatically adjusted based on the interval provided in query
    alignmentPeriod: AlignmentPeriod;
  
    //what reducerFunction was used to collapse one or more datapoints into buckets
    alignmentReducer: ReducerFunction;
  
    crossSeriesReducer: CrossSeriesReducerFunction;
  
    //this may be different than what was requested in query
    interval: { startTime: Date, endTime: Date };

    //array of one or more time series
    timeSeries: TimeSeries[];
  }
}

export declare namespace FlatValue {

  //TODO: have labels later
  export namespace LabelValue {
    export type String = {
      type: 'string';
    }
  
    export type Bool = {
      type: 'boolean'
    }
  
    export type Number = {
      type: 'number';
    }
  
    export type Enum = {
      type: 'enum',
      options: string[];
    }
  
    export type EnumMulti = {
      type: 'enum[]',
      options: string[]
    }
  
    export type ResourceId = {
      type: 'id',
      resourceType: ResourceType
    }
  
    export type ResourceIdMulti = {
      type: 'id[]',
      resourceType: ResourceType
    }
  
    export type LabelValueType = LabelValue.String | LabelValue.Bool | LabelValue.Number | LabelValue.Enum | LabelValue.EnumMulti | LabelValue.ResourceId | LabelValue.ResourceIdMulti;
  }

  export interface MetricDescriptor {
    displayName: string,
    description: string,
    type: string,
    applicableResource: ResourceType,
    valueType: ValueType,
    unit: Unit,

    labels?: {
      key: string,
      description: string,
      required: boolean,
      value: LabelValue.LabelValueType
    }[]
  }

  export interface FlatValue {
    isMissing: boolean;
    value: number;
  }
  
  export interface Query {
    metricType: string;
  }
  
  export interface Result {
    metricType: string,
    unit: Unit,

    hoverLabel?: string;
    adjacentLabel?: string;
  
    flatValue: FlatValue;
  }
}