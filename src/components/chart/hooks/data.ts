import { useMemo } from "react";
import { TimeSeries } from "../../../model/domain/metrics";
import logger from "../../../utils/logger";

export const useData = (timeSeriesResult: any) => useMemo(() => getStackedPoints(timeSeriesResult), [timeSeriesResult]);

const getStackedPoints = (timeSeriesResult: TimeSeries.Result) => {
  const stackedPoints: any[] = [];
  let max = 0;
  let linearMax = 0;

  try {
    if (!timeSeriesResult) return { points: stackedPoints, max, linearMax };
    const { timeSeries } = timeSeriesResult
    const reference = timeSeries[0]
    const numPoints = reference.points.length;
    const numResource = timeSeries.length

    for (let i = 0; i < numPoints; i++) {
      let stackedPoint = { date: reference.points[i].at };
      let totalValue = 0;

      for (let j = 0; j < numResource; j++) {
        const point = timeSeries[j].points[i];
        const resource = timeSeries[j].displayLabel;

        if (point.isMissing) {
          stackedPoint[resource] = null;
        } else {
          totalValue += point.value;
          linearMax = Math.max(linearMax, point.value)
          stackedPoint[resource] = point.value;
        }
      }
      stackedPoints.push(stackedPoint);
      max = max < totalValue ? totalValue : max;
    }
  } catch (e) {
    logger.log(e)
  }
  return { points: stackedPoints, max, linearMax };
}

export const useCombinedData = (timeSeriesResults: TimeSeries.Result[]) => useMemo(() => {
  const points: any = [];
  let max = 0;
  const hasError = timeSeriesResults.reduce((acc, ts: TimeSeries.Result) => !ts?.timeSeries || acc, false);
  if (hasError) return { points, max };

  const reference = timeSeriesResults[0].timeSeries[0]
  const numPoints = reference.points.length;
  const numResource = timeSeriesResults.length

  const formatLabel = (s: string) => s.replace(/_/g, ' ')
  for (let i = 0; i < numPoints; i++) {
    let combinedPoint = { date: reference.points[i].at };

    for (let j = 0; j < numResource; j++) {
      const point = timeSeriesResults[j].timeSeries[0].points[i];
      const resource = formatLabel(timeSeriesResults[j].metricType);

      if (point.isMissing) {
        combinedPoint[resource] = null;
      } else {
        combinedPoint[resource] = point.value;
      }
    }

    points.push(combinedPoint);
  }

  return { points, max };
}, [timeSeriesResults]);