import React from 'react'
import { AreaStack } from '@vx/shape';
import { getColor } from '../../utils/color';
import { Graph } from '../../types';
import { getKeys } from '../../utils/points';


export function StackedArea({ xScale, yScale, points, isSelected, noneSelected, event}: Graph) {
  const keys = getKeys(points);
  const reducer = (datum: any): boolean =>  datum.data;
  const getY = (d: any, index: number) => d[index];
  const getAreaStackX = (d: any) => xScale(d.data.date)!;
  
  return (
    <AreaStack
      keys={keys}
      data={points}
      defined={reducer}
      x={getAreaStackX}
      y0={d => yScale(getY(d, 0))}
      y1={d => yScale(getY(d, 1))}
    >
      {({ stacks, path }) =>
        stacks.map((stack, index) => {
          const opacity = isSelected && isSelected(index)? '70' : noneSelected ? '50': '25';
          const color = getColor(index) + opacity;
            return (
            <path
              key={`stack-${index}`}
              d={path(stack) || ''}
              stroke={color}
              strokeWidth={2}
              {...event && event(index)}
              fill={color}
            />
          )
        })
      }
    </AreaStack>);
}

export default StackedArea;