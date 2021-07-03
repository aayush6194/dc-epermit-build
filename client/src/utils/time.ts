import mo, { Moment as MomentType} from 'moment-timezone';

export const moment = mo;

let currentTz = getTimezoneFromStore();
let tzChangeListeners : any[] = [];

export const defaultInterval = () => {
  const endTime = moment();
  const startTime = endTime.clone()
    .set('hours', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);
  return { endTime: endTime.toISOString(), startTime: startTime.toISOString() };
};

export const currentMonth = (month = 0) => {
  const endTime = moment();
  const startTime = endTime.clone()
    .set('month', endTime.month() + month)
    .set('date', 1)
    .set('hours', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);
  return { endTime: endTime.toISOString(), startTime: startTime.toISOString() };
};



export const yearToDate = () => {
  const endTime = moment();
  const startTime = endTime.clone()
    .set('month', 0)
    .set('date', 1)
    .set('hours', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);
  return { endTime: endTime.toISOString(), startTime: startTime.toISOString() };
};

export const getInterval = (days: number)=>{
  const endTime = moment();
  const startTime = endTime.clone().add(-days, 'day');
  return { endTime, startTime }
}

function getTimezoneFromStore() {

 
}

interface TimezoneChangeListener {
  (tz: string): void;
}
export function addTimezoneChangeListener(listener: TimezoneChangeListener) {
  const exists = !!tzChangeListeners.find(l => l === listener);
  if (!exists) {
    tzChangeListeners.push(listener);
  }
}
export function removeTimezoneChangeListener(listener: TimezoneChangeListener) {
  tzChangeListeners = tzChangeListeners.filter(l => l === listener);
}

export function getTimezone() {
  return currentTz;
}

export const FORMAT_DATETIME = 'YYYY-MM-DD hh:mm A';
export const FORMAT_TIME = 'hh:mm A';
export const FORMAT_DATETIME_2 = 'ddd MMM DD, YYYY hh:mm A';


export type Moment = MomentType;
