import { useEffect, useState } from "react";
import { TimeSeries, IntervalPreset_E } from "../model/domain/metrics";

export const defaultTimeSeries: TimeSeries.Query = {
  metricType: "garage_occupancy_count",
  resourceIds: [],
  crossSeriesReducer: "NONE",
  intervalPreset: IntervalPreset_E.today,
};

const defaultDayFilter: TimeSeries.DayFilterQuery = {
  days: [true, true, true, true, true, true, true],
  hours: [8, 18],
};

export enum actions {
  SET_GARAGES,
  SET_ALIGNMENT,
  SET_METRICTYPE,
  SET_INTERVAL_PRESET,
  REFRESH,
  SET_DAY_FILTER,
}

export function reducer(state: TimeSeries.Query, action: any) {
  const setTimeseries = (props: any) => ({ ...state, ...props });

  switch (action.type) {
    case actions.SET_METRICTYPE:
      return setTimeseries({ metricType: action.payload.metricType });

    case actions.SET_GARAGES:
      return setTimeseries({ resourceIds: action.payload.resourceIds });

    case actions.SET_INTERVAL_PRESET:
      return setTimeseries({ intervalPreset: action.payload.intervalPreset });

    case actions.SET_ALIGNMENT:
      const alignment = action.payload || null;
      return setTimeseries({ alignment });

    case actions.SET_DAY_FILTER:
      const dayFilter = !action.payload
        ? null
        : validateDayFilter({ ...state.dayFilter, ...action.payload });
      return setTimeseries({ dayFilter });

    case actions.REFRESH:
      return action.payload;
    default:
      return state;
  }
}

const validateDayFilter = (dayFilter: TimeSeries.DayFilterQuery) => {
  const {
    hours: [start, end],
  } = dayFilter;

  if (end === 0) {
    dayFilter = { ...dayFilter, hours: [start, 24] };
  }

  if (start === 24) {
    dayFilter = { ...dayFilter, hours: [0, end] };
  }

  if (dayFilter.hours[0] > dayFilter.hours[1]) {
    dayFilter = { ...dayFilter, hours: [end, start] };
  }

  return dayFilter;
};

const useTimeSeriesQuery = (initialState = undefined) => {


  const [timeSeriesQuery, setter] = useState( initialState || defaultTimeSeries);
  const setState = (s: Partial<TimeSeries.Query>)=> {
    const newState = {...timeSeriesQuery, ...s}
    setter(newState);

  }
  const setGarages = (resourceIds: string[]) => setState({ resourceIds  });
  
  const setMetric = (metricType: string) => setState({ metricType  });

  const setDayFilter = (e : any) => {
    const dayFilter = !e? null
        : validateDayFilter({ ...timeSeriesQuery.dayFilter, ...e });
    setState({ dayFilter });
  };

  const setAlignment = (
    { alignmentReducer,
    alignmentPeriod
    }:
    { alignmentReducer: TimeSeries.ReducerFunction,
      alignmentPeriod?: TimeSeries.AlignmentPeriod
      }
  ) => {
    setState({
      alignment: { alignmentPeriod, alignmentReducer },
    });
  };

  const setIntervalPreset = (intervalPreset: TimeSeries.IntervalPreset) => setState({ intervalPreset  });
  
  const refresh = (q: TimeSeries.Query) => setState(q);


  return {
    timeSeriesQuery,
    actions: {
      setGarages,
      setAlignment,
      setMetric,
      setIntervalPreset,
      setDayFilter,
      refresh,
    },
  };
};

export default useTimeSeriesQuery;
