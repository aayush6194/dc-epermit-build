import React from 'react'
import { BarStack, AreaStack } from '@vx/shape';
import { scaleOrdinal } from '@vx/scale';
import { colors } from '../../json/colors.json';
import { Group } from '@vx/group';
import { getColor } from '../../utils/color';
import { Graph } from '../../types';
import { getKeys } from '../../utils/points';

export function StackedBar({ yScale, points, xScale, event, isSelected, noneSelected }: Graph) {
  const keys = getKeys(points);
  const getDate = (d: any) => (new Date(d?.date)).toISOString();

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: colors,
  });

  const reducer = (datum: any): boolean => datum.data;
  const getY = (d: any, index: number) => d[index];
  const getAreaStackX = (d: any) => xScale(d.data.date)!;

  return (
    <Group >
      <BarStack<any, string>
        keys={keys}
        data={points}
        xScale={xScale}
        yScale={yScale}
        color={colorScale}
        x={getDate}
      >
        {barStacks => {
          return barStacks.map(barStack => {
            const index = barStack.index;
            return barStack.bars.map((bar) => {
              if (bar.bar.data[bar.key] == null) return null;
              return (
                <rect
                  key={`bar-stack-${barStack.index}-${bar.index}`}
                  x={bar.x}
                  y={bar.y}
                  opacity={noneSelected || (isSelected && isSelected(barStack.index))? 0.7 : 0.3}
                  height={bar.height}
                  width={bar.width}
                  fill={getColor(index)}
                />
              )
            })
          })
        }
      }
      </BarStack>

      <AreaStack
        keys={keys}
        data={points}
        defined={reducer}
        x={getAreaStackX}
        y0={d => yScale(getY(d, 0))}
        y1={d => yScale(getY(d, 1))}
      >
        {({ stacks, path }) => stacks.map((stack, index) =>  (
              <path
                key={`stack-${index}`}
                d={path(stack) || ''}
                opacity={0}
                {...event && event(index)}
              />
            )
          )}
      </AreaStack>
    </Group>);
};

export default StackedBar;