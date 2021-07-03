import React, { CSSProperties, useEffect, useState } from "react";
import { Card, Empty as EmptyEl } from 'platyplex_ui'
import Graph from "./components/graph";
import LegendTable from "./components/legend-table";
import { Charts, ChartProps, MultiMetricsChartProps } from "./types";
import { useResize } from "./hooks/resize";
import ChartHeader from "./components/header";
import Loader from './components/loading';
import { useChartType } from "./hooks/chart-type";
import { useData, useCombinedData } from "./hooks/data";
import { useSelector } from "react-redux";

const d100: CSSProperties = { height: '100%', width: '100%', textAlign: 'center', marginTop: "1em" };
const height = 400;

const Chart = ({ filter, loading, download, eId,  queries, metricDataStatus, legend, filterWidth, title, isPercent, chartTypes = [Charts.stackedBar], inChartLegend }: ChartProps) => {
  const { chartType, setChartType } = useChartType({ chartTypes, isPercent })
  const { container, width } = useResize({ filterWidth });
  const { points } = useData(metricDataStatus.data?.timeSeriesResult);
  return (
    <>
      <Card
        placeSelf="stretch"
        shadow
        grid
        customCols={"1fr"}
        gridGap={"0 1em"}
        className="slide-up noselect"
      >
        <ChartHeader
          chartType={chartType}
          chartTypes={chartTypes}
          setChartType={setChartType}
          title={title}
          loading={loading}
          isPercent={isPercent}
          filter={filter}
          eId={eId}
          queries={ queries}
        />
        <div style={{ width: "100%", marginTop: "1em" }} ref={container}>
          {metricDataStatus?.loading
            ? <Loader style={{ ...d100, height }} />
            : metricDataStatus?.error || !metricDataStatus?.data!?.timeSeriesResult
              ? <EmptyEl text="Error Occured" style={{ ...d100, height }} />
              : <Graph
                  inChartLegend={inChartLegend}
                  chartType={chartType}
                  size={{ height, width }}
                  data={metricDataStatus.data as any}
                />
          }
        </div>
      </Card>
      <LegendTable
        legend={legend ? legend : undefined}
        points={points}
      />
    </>
  );
};

const MultiMetricsChart = ({ filter, metricDataStatuses, legend, filterWidth, title, inChartLegend, fixedAlignment, download, eId, queries}: MultiMetricsChartProps) => {
  const { container, width } = useResize({ filterWidth });
  const isLoading = metricDataStatuses.reduce((acc, curr) => acc || curr.loading, false);
  const hasError = metricDataStatuses.reduce((acc, curr) => acc || curr.error || !curr?.data?.timeSeriesResult, false);
  const datas = metricDataStatuses.map(({ data }) => data);
  const timeSeries = metricDataStatuses.map(({ data }) => data?.timeSeriesResult)
  const { points } = useCombinedData(timeSeries as any);
  return (
    <>
      <Card
        placeSelf="stretch"
        shadow
        grid
        customCols={"1fr auto"}
        gridGap={"0 1em"}
        className="slide-up noselect"
      >
        <ChartHeader
          title={title}
          filter={filter}
          download={download}
          eId={eId}
          queries={queries}
        />
        <div style={{ width: "100%", marginTop: "1em" }} ref={container}>
          {isLoading
            ? <Loader style={{ ...d100, height }} />
            : hasError
              ? <EmptyEl text="Error Occured" style={{ ...d100, height }} />
              :
              <Graph.Multi
                fixedAlignment={fixedAlignment}
                inChartLegend={inChartLegend}
                chartType={Charts.combined}
                size={{ height, width }}
                datas={datas as any}
              />
          }
        </div>
      </Card>
      <LegendTable
        legend={legend ? legend : undefined}
        points={points}
      />
    </>
  );
};

Chart.Multi = MultiMetricsChart
export default Chart;