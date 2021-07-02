import { TimeSeries } from "../../model/domain/metrics";
import {  ScaleLinear, ScaleBand } from 'd3-scale';
import { MetricDataStatus } from "../../hooks/metrics";
import { LineChart } from "../../model/domain/dashboard";

export enum Charts {
    stackedArea = "stackedArea",
    multiLine = "multiLine",
    stackedBar = "stackedBar",
    combined = "combined"
}

export interface AdditionalChartProps {
    filter?: boolean | React.ReactElement | null;
    filterWidth?: number;
    metricDataStatus: MetricDataStatus;
    className?: string;
    loading? : boolean;
    legend?: false | { label : string};
    isPercent?: boolean;
    download? : string;
    eId?: string; 
    inChartLegend? : boolean;
    queries?: any; 
    chartTypes?: Charts[] | string[];
}

export interface AdditionalMultiChartProps {
  filter?: boolean | React.ReactElement | null;
  filterWidth?: number;
  loading? : boolean;
  fixedAlignment: string;
  metricDataStatuses: MetricDataStatus[];
  className?: string;
  inChartLegend? : boolean; 
  download? : string;
  queries?: any;
  eId?: string; 
  legend?:  false | { label : string };
}

export type ChartProps = AdditionalChartProps & LineChart;
export type MultiMetricsChartProps = AdditionalMultiChartProps & LineChart;

export interface DrawAreaProps {
  size: { height: number, width: number };
  data: {
    timeSeriesResult: TimeSeries.Result;
  };
  inChartLegend?: boolean;
  chartType: Charts | string;
}

export interface MultiDrawAreaProps {
  size: { height: number, width: number };
  fixedAlignment: string;
  datas: {
    timeSeriesResult: TimeSeries.Result;
  } [];
  chartType: Charts | string;
  inChartLegend?: boolean;
}

type EventHandler = (e :React.SyntheticEvent) => void;

export interface GraphEvent {
    onTouchStart : EventHandler;
    onTouchMove : EventHandler;
    onMouseMove : EventHandler;
    onMouseLeave : EventHandler;
};

export type Graph = {
    yScale: ScaleLinear<number, number>;
    isSelected?: (i : number) => boolean;
    noneSelected?: boolean;
    points: any;
    xScale: ScaleBand<string>;
    event? : (i: number ) => GraphEvent
};

export interface Points {
  [key: string]: string | number;
  date: string;
};

export type CombinedGraph = Graph & { y2Scale: ScaleLinear<number, number>; points2: any }