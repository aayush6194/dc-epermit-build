import { getColor } from "../utils/color";
import { localPoint } from '@vx/event';
import { useTooltip } from '@vx/tooltip';
import { getKeys } from "../utils/points";
import {  ScaleBand } from 'd3-scale';
import { useMemo } from 'react';
interface TooltipData {
    timestamp: string;
    legend: { label: string, value: string, color: string }[];
}

interface TooltipProps {
   points: {[key: string]: string | number; date: string;}[],
   setSelected? : any;
   units?: string[];
   xScale: ScaleBand<string>;
   dateFormatter: {(d: string): string;}
}
/*
      |                            |
      |                            |
      |                            |
      |         |||          |||   |  
      |         |||          |||   |  
      |   |||   |||    |||   |||   |  
      |   |||   |||    |||   |||   |  
      |   |||   |||    |||   |||   |   
      |   |||   |||    |||   |||   |  
    ---------------------------------------------
                *      *     *     *
                a      b     c     d
                
      let x be the X position of the cursor then,
      if (x <= a) {
        show tooltip at middle of first bar
      } else if (x <= b) {
        show tooltip at middle of second bar
      } else if (x <= c) {
        show tooltip at middle of third bar
      } else {
        show tooltip at middle of last bar
      }
*/
export default ({points: points_, setSelected, units, xScale, dateFormatter }: TooltipProps) => {
    const tooltip = useTooltip<TooltipData>();

    //[tuesday, monday, sunday] -> [sunday, monday, tuesday]
    //[sunday, monday, tuesday] -> [sunday, monday, tuesday]
    const points = useMemo(() => {
      return points_[0].date > points_[points_.length - 1].date
        ? [...points_].reverse()
        : points_;
    }, [points_]);

    /*
      |                                       |
      |                                       |
      |                                       |
      |         |||    |||   |||         |||  |  
      |         |||    |||   |||         |||  |  
      |   |||   |||    |||   |||   |||   |||  |  
      |   |||   |||    |||   |||   |||   |||  |  
      |   |||   |||    |||   |||   |||   |||  |  
      |   |||   |||    |||   |||   |||   |||  |   
    ---------------------------------------------
          ^                                ^
          |                                | 
        (band start)                    (band end)
    */
    const bandStart = xScale(points[0].date) || 0;
    const bandEnd = xScale(points[points.length - 1].date) || 0 + xScale.bandwidth();

    const getUnit = (i: number) => units? units[i % units.length] : '';

    const getLegend = (i: number) => {
        const keys = getKeys(points);
        const toPercent = (n: number) => (n * 100).toFixed(2) + '%';
        const toDollar = (n: number) => '$'+ (n / 100).toFixed(0) ;
        const point = points[i] || {};

        return keys.map((label: string, index: number) => {
            let value = point[label] as any;
            const isMissing = value == null;
            const unit = getUnit(index);
            value = unit === '%'
              ? toPercent(value)
              : unit === 'cents'
              ? toDollar(value)
              : value + ''; 

            return { label, value, color: getColor(index), isMissing }
        })
    }

    //offsetting local point x, y so as to have `bandStart` as effective start
    //helps calculation below.
    const graphLocal = (event: any) => {
      const { x, y } = localPoint(event) || { x: 0, y: 0};

      return { x: x - bandStart, y };
    }

    return {
        ...tooltip,
        handleTooltip: (event: any, newSelected = -1) => {
          let { x, y } = graphLocal(event) || {};
          setSelected(newSelected);
          
          const i = x > bandEnd
            ? points.length - 1
            : x < 0
            ? 0
            : Math.floor(x! / xScale.step());

          /*
              |                                       |
              |                                       |
              |                                       |
              |         |||    |||   |||         |||  |  
              |         |||    |||   |||         |||  |  
              |   |||   |||    |||   |||   |||   |||  |  
              |   |||   |||    |||   |||   |||   |||  |  
              |   |||   |||    |||   |||   |||   |||  |  
              |   |||   |||    |||   |||   |||   |||  |   
            ---------------------------------------------
                                *
                                ^
                                |
                                iX for i = 2 (mid point of the third bar line)
          */
          const iX = bandStart + i * xScale.step() + xScale.bandwidth() / 2;          

          const timestamp = xScale.domain()[i];

            //const i = bisect(timestamp);
            const legend = getLegend(i);

            // try replacing iX with x + bandStart, and if thats
            // better then replce this
            tooltip.showTooltip({
                tooltipData: { timestamp: dateFormatter(timestamp), legend },
                tooltipLeft: iX,
                tooltipTop: y,
            });

        }
    }
}