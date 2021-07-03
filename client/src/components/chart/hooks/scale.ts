import { scaleLinear, scaleBand } from '@vx/scale';
import { DrawAreaRect } from './rect';

type Scale = { yMax: number, rect: DrawAreaRect, points: any, zoom? : number };

export const useScale = ({ rect,  points, yMax, zoom = 1.15 }: Scale) => ({
  xAxis: getXBandScale({rect, points}),
  yAxis: {
    scale: scaleLinear({
      domain: [0, zoom * yMax],
      range: rect.yRange,
    })
  }
});

function getXBandScale({ rect, points }: { rect: DrawAreaRect, points: any }) {
  const getDate = (d: any) => (new Date(d?.date || '2010')).toISOString();;
  const getDates = (points: any[]) => {
    const dates = []
    for (let i = points.length - 1; i >= 0; i--) {
      dates.push(getDate(points[i]))
    }
    return dates;
  }

  return {
    scale: scaleBand<string>({
      domain: getDates(points),
      range: rect.xRange,
      padding: 0.2,
    })
  }
}