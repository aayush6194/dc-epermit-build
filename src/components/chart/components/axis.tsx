import React, { useMemo } from 'react';
import { AxisBottom, AxisLeft, AxisRight } from '@vx/axis';
import {  ScaleBand } from 'd3-scale';

export const XAxis = ({ scale,  tickFormat, axisStyleProps}: { scale:  ScaleBand<string>, tickFormat: any, axisStyleProps: any}) => {
  const width = (() => {
    const range = scale.range();
    return range[1] - range[0]
  })();

  const maxTicks = width < 800? 5: 10;

  const tickValues = useMemo(() => {
    const dates = scale.domain();
    
    const mod = Math.floor(dates.length / maxTicks);
    const tickFilter = ((_: any, index: number)=> dates.length < 10 || index % mod == 0);

    return dates.filter(tickFilter);
  }, [maxTicks]);

  const  tickLabelProps = () => ({
    fontWeight: 'bold',
    fill: 'gray',
    fontSize: 11,
    textAnchor: 'middle'
  })

  return (
      <AxisBottom
        tickFormat={tickFormat}
        tickLabelProps={tickLabelProps}
        scale={scale}
        tickValues={tickValues} {...axisStyleProps}
        hideTicks={false}
      />
  );
};

export const YAxisLeft = ({ scale, tickFormat, axisStyleProps }: any) => {
  const tickValues = scale.ticks(10);
  axisStyleProps = axisStyleProps || {};
  const  tickLabelProps = () => ({
    fontWeight: 'bold',
    fill: 'gray',
    fontSize: 11,
    dx: -18,
    dy: 5
  })
  return (
      <AxisLeft
        scale={scale}
        tickLabelProps={tickLabelProps}
        tickFormat={tickFormat}
        tickValues={tickValues} 
        {...axisStyleProps}
      />
  );
};

export const YAxisRight = ({ scale, tickFormat, axisStyleProps }: any) => {
  const tickValues = scale.ticks(10);
  const  tickLabelProps = () => ({
    fontWeight: 'bold',
    fill: 'gray',
    fontSize: 11,
    dx: 12,
    dy: 5
  })
  return (
      <AxisRight
        scale={scale}
        tickFormat={tickFormat}
        tickLabelProps={tickLabelProps}
        tickValues={tickValues} {...axisStyleProps}/>
  );
};

export const defaultAxisStyle = {
  hideAxisLine: true,
  tickStroke: 'gray',
  tickLength: 6,
  hideTicks: true,
  hideZero: false
}
