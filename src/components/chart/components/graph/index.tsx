import React, { useState } from 'react'
import { XAxis, YAxisLeft, YAxisRight, defaultAxisStyle } from '../axis';
import { useRect } from '../../hooks/rect';
import { useScale } from '../../hooks/scale';
import { useData, useCombinedData } from '../../hooks/data';
import useToolTip from '../../hooks/tooltip';
import Tooltip from '../tooltip';
import { DrawAreaProps, Graph, MultiDrawAreaProps, CombinedGraph, Charts } from '../../types';
import Grid from '../grid';
import { getChart } from '../../utils/chart';
import { TimeSeries } from '../../../../model/domain/metrics';
import { moment, getTimezone } from '../../../../utils/time';
import { LegendOrdinal } from '@vx/legend';
import { scaleOrdinal } from "@vx/scale";
import { colors } from '../../json/colors.json';
import { getKeys } from '../../utils/points';

const DrawArea = (props: DrawAreaProps) => {
  const { size, chartType, data } = props;
  const { timeSeriesResult } = data as any;
  const { height, width } = size;
  const rect = useRect({ height, width });
  const { max, points, linearMax } = useData(timeSeriesResult);
  const [selected, setSelected] = useState(-1);
  const isSelected = (index: number) => selected === index;

  const { xAxis, yAxis } = useScale({ rect: rect, yMax: chartType === Charts.multiLine ? linearMax : max, points });
  const tickFormatY = getYTickFormatter(timeSeriesResult);
  const tickFormatX = getXTickFormatter(timeSeriesResult);
  const tooltipFormatter = getTooltipDateFormatter(timeSeriesResult);

  const { tooltipData, hideTooltip, handleTooltip, tooltipLeft, tooltipTop, tooltipOpen } = useToolTip({
    points,
    setSelected,
    units: [timeSeriesResult.unit],
    xScale: xAxis.scale,
    dateFormatter: tooltipFormatter
  });

  const event = (index = -1) => ({
    onTouchStart: (e: any) => handleTooltip(e, index),
    onTouchMove: (e: any) => handleTooltip(e, index),
    onMouseMove: (e: any) => handleTooltip(e, index),
    onMouseLeave: () => {
      setSelected(-1);
      hideTooltip();
    }
  })

  const chartProps: Graph = {
    yScale: yAxis.scale,
    points,
    xScale: xAxis.scale,
    isSelected,
    noneSelected: selected === -1,
    event
  };

  return (
    <>
      <div style={{ height: height + 'px', width: '100%', position: 'relative' }}>
        <SVG height={height} width={'100%'} {...event(-1)}>
          <Tooltip.Line
            height={height}
            tooltipData={tooltipData}
            tooltipLeft={tooltipLeft}
          />

          <g transform={`translate(0,${rect.height - rect.margin.bottom})`}>
            <XAxis
              scale={xAxis.scale}
              tickFormat={tickFormatX}
              axisStyleProps={defaultAxisStyle} />
          </g>

          <g transform={`translate(${rect.margin.left},0)`}>
            <Grid yScale={yAxis.scale} width={rect.innerWidth} />
            <YAxisLeft
              scale={yAxis.scale}
              tickFormat={tickFormatY}
              axisStyleProps={defaultAxisStyle} />
          </g>
          {/*always have this below the <Grid />*/}
          {getChart(chartType, chartProps)}

        </SVG>
        <Tooltip
          tooltipOpen={tooltipOpen}
          tooltipLeft={tooltipLeft}
          tooltipTop={tooltipTop}
          tooltipData={tooltipData}
          isSelected={isSelected}
          noneSelected={selected === -1}
        />
      </div>
      {props.inChartLegend &&
        <LegendOrdinal
          scale={scaleOrdinal({
            range: colors,
            domain: getKeys(points)
          })
          }
          style={{
            fontSize: '13px',
            display: 'grid',
            textTransform: 'capitalize',
            placeItems: 'center',
            gridTemplateColumns: `repeat(${getKeys(points).length}, 1fr)`
          }}
          shape='circle'
          labelMargin="0 15px 0 0"
        />
      }
    </>
  );
}

const MultiDrawArea = (props: MultiDrawAreaProps) => {
  const { size, chartType, datas } = props;
  const [{ timeSeriesResult }, { timeSeriesResult: timeSeriesResult2 }] = datas;
  const { height, width } = size;
  const rect = useRect({ height, width });
  const data1 = useData(timeSeriesResult);
  const data2 = useData(timeSeriesResult2);
  const dataComb = useCombinedData([timeSeriesResult, timeSeriesResult2]);

  const { xAxis, yAxis } = useScale({
    rect,
    yMax: data1.max,
    points: data1.points
  });

  const { yAxis: y2Axis } = useScale({
    rect,
    yMax: data2.max,
    points: data2.points
  });

  const tickFormatYLeft = getYTickFormatter(timeSeriesResult);
  const tickFormatYRight = getYTickFormatter(timeSeriesResult2);
  const tickFormatX = getXTickFormatter({...timeSeriesResult2, ...props.fixedAlignment? {alignmentPeriod: props.fixedAlignment} : {}} as any);
  const tooltipFormatter = getTooltipDateFormatter(timeSeriesResult);

  const { tooltipData, hideTooltip, handleTooltip, tooltipLeft, tooltipTop, tooltipOpen } = useToolTip({
    points: dataComb.points,
    units: [timeSeriesResult.unit, ''],
    setSelected: () => { },
    xScale: xAxis.scale,
    dateFormatter: tooltipFormatter
  });


  const event = (index = -1) => ({
    onTouchStart: (e: any) => handleTooltip(e, index),
    onTouchMove: (e: any) => handleTooltip(e, index),
    onMouseMove: (e: any) => handleTooltip(e, index),
    onMouseLeave: () => hideTooltip()
  });
  const chartProps: CombinedGraph = {
    yScale: yAxis.scale,
    points: data1.points,
    points2: data2.points,
    y2Scale: y2Axis.scale,
    xScale: xAxis.scale,
    event
  };

  return (
    <>
      <div style={{ height: height + 'px', width: '100%', position: 'relative' }}>
        <SVG height={height} width={'100%'} {...event(-1)}>
          <Tooltip.Line
            height={height}
            tooltipData={tooltipData}
            tooltipLeft={tooltipLeft} />

          <g transform={`translate(0,${rect.height - rect.margin.bottom})`}>
            <XAxis
              scale={xAxis.scale}
              tickFormat={tickFormatX}
              axisStyleProps={defaultAxisStyle} />
          </g>

          <g transform={`translate(${rect.margin.left},0)`}>
            <Grid yScale={yAxis.scale} width={rect.innerWidth} />
            <YAxisLeft
              scale={yAxis.scale}
              tickFormat={tickFormatYLeft}
              axisStyleProps={defaultAxisStyle} />
          </g>

          <g transform={`translate(${rect.width - rect.margin.right},0)`}>
            <YAxisRight
              scale={y2Axis.scale}
              tickFormat={tickFormatYRight}
              axisStyleProps={defaultAxisStyle} />
          </g>

          {/*always have this below the <Grid />*/}
          {getChart(chartType, chartProps)}

        </SVG>
        <Tooltip
          tooltipOpen={tooltipOpen}
          tooltipLeft={tooltipLeft}
          tooltipTop={tooltipTop}
          tooltipData={tooltipData} />
      </div>
      {props.inChartLegend &&
        <LegendOrdinal
          scale={scaleOrdinal({
            range: colors,
            domain: getKeys(dataComb.points)
          })
          }
          style={{
            fontSize: '13px',
            display: 'grid',
            placeItems: 'center',
            textTransform: 'capitalize',
            gridTemplateColumns: `repeat(${getKeys(dataComb.points).length}, 1fr)`
          }}
          shape='circle'
          labelMargin="0 15px 0 0"
        />
      }
    </>
  );
}
interface SVGProps {
  height: number | string,
  width: number | string,
  children: any,
  onTouchStart: { (e: React.SyntheticEvent): void };
  onTouchMove: { (e: React.SyntheticEvent): void };
  onMouseMove: { (e: React.SyntheticEvent): void };
  onMouseLeave: { (e: React.SyntheticEvent): void };
}

const SVG = (o: SVGProps) => (
  <svg width={o.width} height={o.height}>
    <rect
      x={0}
      y={0}
      width={o.width}
      height={o.height}
      fill={'transparent'}
      onTouchStart={o.onTouchStart}
      onTouchMove={o.onTouchMove}
      onMouseMove={o.onMouseMove}
      onMouseLeave={o.onMouseLeave} />
    {o.children}
  </svg>
);

DrawArea.Multi = MultiDrawArea;
export default DrawArea;

function getYTickFormatter(ts: TimeSeries.Result) {
  const identity = (n: any) => n % 1 != 0? null: n;
  const centsFormatter = (n: number) => '$' + (n / 100).toFixed(0);
  const percentFormatter = (n: number) => (n * 100).toFixed(1) + '%';

  return ts.unit === '%'
    ? percentFormatter
    : ts.unit === 'cents'
      ? centsFormatter
      : identity;
}

/*
  How TimeSeries Dates should be interpreted:

  Data points are returned in descending order w.r.t 
  `at` field in time series points i.e. data at position 0 is
  greater than data at position 1. Say following 2 successive data points:

  [
    { at: x, value: v1 isMissing: false },
    { at: y, value: v2, isMissing: false }
  ]

  then,
  
  x is always greater than y.

  Moreover, every time series result has `alignmentPeriod` field,
  and according to that, successive data points differ w.r.t `at` field.

  Following table shows the difference between x and y field for various
  alignmentPeriods.

  alignmentPeriod  |   x - y
  =============================
      1h           |   1 hours
      1d           |   1 day
      1w           |   1 week
      1m           |   1 month

  Another thing is that, the value associated with a
  time series point whose `at` field is t1, is some aggregation of data points
  that was collected between (t1, t2], and t2 - t1 is the alignmentPeriod.

  Thus, for above, v1 is the aggregation of data points between x and y i.e. 
  including x but not y.

  Similarly, v2 is the aggregation of data points between y and z i.e. including
  y and not z; and y - z is the alignment period.

  This brings to the point of how it affects label. 

  Say our alignmentPeriod was 1w, and the data points were marked at following:
  [ 
    { at: 2020-01-14T00:00:00Z, value: v1, isMissing: false },
    { at: 2020-01-07T00:00:00Z, value: v2, isMissing: false }
  ]

  then v1 is the accumulation of data between (07T00, 14T00].

  What that means is, datapoints between Jan 7 00:01 AM and Jan 14 00:00 AM
  are being considered. So, infact what we ought to show in the user friendly
  label is not Jan 7 to Jan 14 but rather Jan 7 to Jan 13.

  So, the display label math turns out to be [d - 1 - 1 week, d - 1].
  
  We do this math for 1m, 1w and 1d. Others aren't necessary, since the
  time difference is already very small

*/

const minusOneDay = (d: string) => moment(d).add(-1, 'day').toISOString();

const getXTickFormatter = (() => {
  const f = (date: string, formatter: string) => moment(date).format(formatter);

  const map: { [key in TimeSeries.AlignmentPeriod]: { (d: string): string } } = {
    '1m': (d: string) => f(minusOneDay(d), 'MMM'),
    '1w': (d: string) => {
      d = minusOneDay(d);
      const d0 = moment(d).subtract(6, 'day').toISOString();
      return `${f(d0, 'MMM DD')} - ${f(d, 'MMM DD')}`;
    },
    '1d': (d: string) => {
      d = minusOneDay(d);
      return moment(d).get('month') === 0 ? f(d, 'MMM, YYYY') : f(d, 'MMM DD');
    },
    '4h': (d: string) => f(d, 'MMM DD'),
    '1h': (d: string) => f(d, 'MMM DD h A'),
    '30m': (d: string) => f(d, 'ddd h A'),
    '5m': (d: string) => f(d, 'h:mm A')
  };

  const defaultFormatter = map['30m'];

  return (ts: TimeSeries.Result) => {
    return map[ts.alignmentPeriod] || defaultFormatter;
  }
})();

const getTooltipDateFormatter = (() => {
  const f = (date: string, formatter: string) => moment(date).format(formatter);

  const map: { [key in TimeSeries.AlignmentPeriod]: { (d: string): string } } = {
    '1m': (d: string) => f(minusOneDay(d), 'MMM, YYYY'),
    '1w': (d: string) => {
      d = minusOneDay(d);
      const d0 = moment(d).subtract(6, 'day').toISOString();
      return `${f(d0, 'MMM DD, YYYY')} - ${f(d, 'MMM DD, YYYY')}`;
    },
    '1d': (d: string) => f(minusOneDay(d), 'MMM DD, YYYY'),
    '4h': (d: string) => f(d, 'MMM DD, YYYY, ddd h A'),
    '1h': (d: string) => f(d, 'MMM DD, YYYY, ddd h A'),
    '30m': (d: string) => f(d, 'MMM DD, ddd h A'),
    '5m': (d: string) => f(d, 'MMM DD, h:mm A')
  };

  const defaultFormatter = map['30m'];

  return (ts: TimeSeries.Result) => {
    return map[ts.alignmentPeriod] || defaultFormatter;
  }
})();