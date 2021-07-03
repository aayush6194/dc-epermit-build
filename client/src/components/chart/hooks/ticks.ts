import { moment, getTimezone } from '../../../utils/time'

export const useTicks = ({ unit, dates }: any) => ({
    tickFormatY: (() => {
        return (n: number) => {
            if (unit !== '%')
                return n + '';
            return Math.round(n * 100) + '%';
        }
    })(),

    tickFormatX: (() => {
        const s = moment(dates[0]);
        const  e = moment(dates[dates.length - 1]);
        const dayDiff = e.diff(s, 'days', true);
        const monthDiff = e.diff(s, 'months', true);
        const formatString =  dayDiff <= 1
          ? 'h:mm A'
          : dayDiff <= 7
            ? 'ddd h A'
            : monthDiff <= 3
              ? 'MMM DD'
              : 'MMM';
    
        let isFirst = false;
        const mmmFormatter = (date: Date) => {
          const m = moment.tz(date.toISOString());
          if (!isFirst) {
            isFirst = true;
            return m.format('MMM, YYYY');
          } else if (m.get('month') === 0) {
            return m.format('MMM, YYYY')
          }
    
          return m.format('MMM');
        }
        const formatter = (date: Date) => moment.tz(date.toISOString()).format(formatString)
    
        return (d: string)=>  formatString === 'MMM'? mmmFormatter(new Date(d)): formatter(new Date(d));
      })()  
});
