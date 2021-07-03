import React from 'react'
import { LinePath } from '@vx/shape';
import { getColor } from '../../utils/color';
import { Graph } from '../../types';
import { getKeys } from '../../utils/points';

export default function MultiLine({ points, isSelected, event, xScale, yScale }: Graph) {
  const keys = getKeys(points);
  const linePathX = (d: any) => xScale(d.date)! + xScale.bandwidth() / 2 || 0;
  const linePathY = (d: any, key: string) => yScale(d[key]);
  const reducer = (datum: any): boolean => datum !== null;

  return (
    <>
      {points.map((data: any) => {
        const left = linePathX(data);
        return keys.map((key, i) => {
          const top = yScale(data[key]);
          if (data[key] == null) return null;
          return (
            <g key={`circle-${i}`}>
              <circle
                r={7 - points.length / 40}
                cx={left}
                cy={top}
                {...(event ? event(i) : {})}
                stroke={isSelected && isSelected(i) ? getColor(i) : ''}
                fill={getColor(i) + (isSelected && isSelected(i)? '66' : 'BB')}
              />
            </g>
          );
        })

      })}

      {keys?.map((key, index) => (
        <LinePath
          x={linePathX}
          y={(d) => linePathY(d, key)}
          {...(event ? event(index) : {})}
          data={points}
          key={index}
          defined={(d: any) => reducer(d[key])}
          strokeWidth={isSelected && isSelected(index) ? 4 : 2}
          stroke={getColor(index)}
        />
      )
      )}
    </>);
}