import React from 'react'
import { BarStack, LinePath } from '@vx/shape';
import { getColor } from '../../utils/color';
import { CombinedGraph } from '../../types';
import { scaleOrdinal } from '@vx/scale';
import { colors } from '../../json/colors.json';
import { Group } from '@vx/group';
import { getKeys } from '../../utils/points';

export function Combined({ y2Scale, yScale, points, points2, xScale , event}: CombinedGraph) {
  const colorScale = scaleOrdinal<string, string>({
    domain: getKeys(points),
    range: colors,
  });
  const getBarStackX = (d: any) => (new Date(d?.date)).toISOString();
  const keyLine = getKeys(points2)[0] || '';
  const getLineY = (d: any) => y2Scale(d[keyLine]);
  const getLineX = (d: any) => xScale(d.date)! + xScale.bandwidth() / 2;
  const lineReducer = (datum: any): boolean => datum != null;

  return (
    <>
      <Group >
        <BarStack<any, string>
          keys={getKeys(points)}
          data={points}
          xScale={xScale}
          yScale={yScale}
          color={colorScale}
          x={getBarStackX}
        >
          {barStacks =>
            barStacks.map(barStack => {
              const index = barStack.index;
              return barStack.bars.map((bar) => {
                if (bar.bar.data[bar.key] == null) return null;
                return (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    {...(event && event(-1))}
                    opacity={0.6}
                    height={bar.height}
                    width={bar.width}
                    fill={getColor(index)}
                  />
                )
              })
            }
            )}
        </BarStack>
      </Group>

      <LinePath<any>
        x={getLineX}
        y={getLineY}
        data={points2}
        defined={(d: any) => lineReducer(d[keyLine])}
        strokeWidth={3}
        {...(event && event(-1))}
        stroke={getColor(1) + 'A0'}
      />

      {points2.map((d: any, i: number) => {
        const left = getLineX(d);
        const top = getLineY(d);
        if(d[keyLine] == null) return null;
        return (
          <g key={`circle-${i}`}>
            <circle
              r={7 - points2.length/40}
              cx={left}
              cy={top}
              fill={getColor(1) +  'BB'}
            />
          </g>
        );
      })}
    </>);
}

export default Combined;