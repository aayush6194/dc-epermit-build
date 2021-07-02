import { useState, useEffect } from "react";
import API from "../api";
import { TimeSeries } from "../model/domain/metrics";
import logger from "../utils/logger";
export interface MetricDataStatus {
  error: boolean;
  loading: boolean;
  data?: {
    timeSeriesResult: TimeSeries.Result | null;
    metricDescriptor: TimeSeries.MetricDescriptor;
  };
}

interface MetricDataProps {
  timeSeriesQuery: TimeSeries.Query;
  eId: string;
  localStorageKey?: string;
}
export const useMetricData = ({
  timeSeriesQuery,
  eId,
  localStorageKey,
}: MetricDataProps) => {
  const [state, setState] = useState<TimeSeries.Query>({ ...timeSeriesQuery });
  const [metricDataStatus, setMetricDataStatus] = useState<MetricDataStatus>({
    error: false,
    loading: false,
    data: undefined,
  });

  const setIntervalPreset = (intervalPreset: TimeSeries.IntervalPreset) => {
    setState({
      ...state,
      intervalPreset,
    });
  };

  const getMetricData = async (query: TimeSeries.Query) => {
    try {
     
      setMetricDataStatus({ data: null, loading: true, error: false });
      const res = await Promise.all([
        API.getTimeSeries(eId, query),
        API.getTimeSeriesMetricDescriptor(eId, query.metricType),
      ]);
      const [{ timeSeriesResult }, { metricDescriptor }] = res;
      setMetricDataStatus({
        loading: false,
        error: false,
        data: {
          timeSeriesResult,
          metricDescriptor,
        },
      });
    } catch (e) {
      logger.log(e);
      setMetricDataStatus({
        loading: false,
        error: true,
        data: undefined,
      });
    }
  };

  useEffect(() => {
      getMetricData({ ...state });
  }, [state]);


  

  return {
    metricDataStatus,
    setMetricDataStatus,
    setIntervalPreset,
    timeSeriesQuery: state,
    refresh: (q?: TimeSeries.Query) => {
      const query = { ...state, ...q };
      setState(query);
    },
  };
};

export default { useMetricData };
