import { useState, useEffect } from 'react';
import { useMetricData } from '../../hooks/metrics';
import { defaultInterval, moment } from '../../utils/time';
import API from "../../api";
import { TimeSeries, IntervalPreset_E } from '../../model/domain/metrics';

function getAnalyticsCharts() {
  const me: EnterpriseEvent = this;

  const chart = (title: string, metricType: string, chartType: string, crossSeriesReducer = 'NONE') => ({
    title,
    timeSeriesQuery: {
      metricType,
      resourceIds: [me.id],
      crossSeriesReducer,
      alignment: {
        alignmentPeriod: '1d',
        alignmentReducer: 'SUM'
      },
      intervalPreset: 'last_7_days',
    },
    backgroundColor: '#FFFFFF',
    xAxisLabel: 'T',
    yAxisLabel: 'Occupancy',
    chartTypes: [chartType]
  });

  return {
    revenue: chart('Revenue by Type', 'event_revenue', 'stackedBar', 'SUM'),
    transactions: chart('Number of Citation', 'event_transaction_count', 'multiLine', 'SUM'),
    reservations: chart('Towings Per Garage', 'event_reservation_occupancy', 'stackedBar',)
  };
};

function getLiveCharts() {
  const me: EnterpriseEvent = this;
  const intervalPreset = me.liveQueryIntervalPreset;

  const revenueAndTransactions = {
    "title": "Revenue & Transactions",
    "revenueTimeSeriesQuery": {
      "metricType": "event_revenue",
      "resourceIds": [],
      "crossSeriesReducer": "NONE",
      "alignment": {
        "alignmentPeriod": "1h",
        "alignmentReducer": "SUM"
      },
      intervalPreset
    },
    "transactionTimeSeriesQuery": {
      "metricType": "event_transaction_count",
      "resourceIds": [],
      "crossSeriesReducer": "NONE",
      "alignment": {
        "alignmentPeriod": "1h",
        "alignmentReducer": "SUM"
      },
      intervalPreset
    },
    "backgroundColor": "#FFFFFF",
    "xAxisLabel": "T",
    "yAxisLabel": "Occupancy",
    "chartTypes" : ["combined"]
  };

  const reservations = {
    "title": "Total Cars Parked",
    "timeSeriesQuery": {
      "metricType": "event_reservation_occupancy",
      "resourceIds": [],
      "crossSeriesReducer": "NONE",
      intervalPreset
    },
    "backgroundColor": "#FFFFFF",
    "xAxisLabel": "T",
    "yAxisLabel": "Occupancy",
    "chartTypes" : [ "stackedBar"]
  };

  return {
    reservations,
    revenueAndTransactions
  };
};

const [getAnalyticsStats, getLiveStats] = (() => {
  function sumPoints(points) {
    return points.reduce((sum, point) => point.isMissing? sum: sum + point.value, 0)
  }

  function getStats(epId: string, type: 'analytics' | 'live'): Promise<Stats> {
    const me = this as EnterpriseEvent;
    const intervalPreset = type === 'analytics'
      ? me.analyticsQueryIntervalPreset
      : me.liveQueryIntervalPreset;

    const alignmentPeriod = '1d';

    const revenueQuery = {
      metricType: 'event_revenue',
      resourceIds: [me.id],
      crossSeriesReducer: 'NONE',
      alignment: {
        alignmentPeriod,
        alignmentReducer: 'SUM'
      },
      intervalPreset
    };
  
    const transactionQuery = {
      ...revenueQuery,
      metricType: 'event_transaction_count', 
      crossSeriesReducer: 'SUM' 
    };

    console.log(JSON.stringify(revenueQuery, null, 2));
    console.log(JSON.stringify(transactionQuery, null, 2));
  
    return Promise.all([
      API.getTimeSeries(epId, transactionQuery),
      API.getTimeSeries(epId, revenueQuery)
    ]).then( ([ r1, r2 ]) => {

      if (r1?.timeSeriesResult && r2?.timeSeriesResult)  {
      //revenue
      const ts1 = r2.timeSeriesResult as TimeSeries.Result;
      const normal = sumPoints(ts1.timeSeries[0].points);
      const dynamic = sumPoints(ts1.timeSeries[1].points);
      const total = normal + dynamic;
      
      //transactions
      const ts2 = r1.timeSeriesResult as TimeSeries.Result;
      const transactions = sumPoints(ts2.timeSeries[0].points);
      return { revenue: { normal, dynamic, total }, transactions };
      }


    })
  }

  function getAnalyticsStats(epId: string): Promise<Stats> {
    const me = this as EnterpriseEvent;
    return getStats.call(me, epId, 'analytics');
  }

  function getLiveStats(epId: string): Promise<Stats> {
    const me = this as EnterpriseEvent;
    return getStats.call(me, epId, 'live');
  }

  return [getAnalyticsStats, getLiveStats];
})();

export interface Stats {
 
  revenue: { normal: number; dynamic: number; total: number; }
  transactions: number;
}

export interface EnterpriseEvent {
  id: string;
  name: string;
  start: Date;
  end: Date;
  getAnalyticsCharts: { (): { revenue: any; transactions: any; reservations: any } };
  getLiveCharts: { (): { revenueAndTransactions: any, reservations: any }  };
  getAnalyticsStats: { (epId: string): Promise<Stats> };
  getLiveStats: { (epId: string): Promise<Stats> };
  analyticsQueryIntervalPreset: TimeSeries.IntervalPreset;
  liveQueryIntervalPreset: TimeSeries.IntervalPreset;
  reservationOccupancy: {
    garageName: string;
    occupancy: number;
    staffs: number;
  }[]
}

export function getEnterpriseEvent(eventId: string) {
  return getEnterpriseEvents().find(e => e.id === eventId);
}

export function getEnterpriseEvents(): EnterpriseEvent[] {

  const analyticsQueryIntervalPreset = IntervalPreset_E.last_7_days;
  const liveQueryIntervalPreset = 'last_7_day';
 const  reservationOccupancy = [
  {
    garageName: 'T. Dernoga',
    occupancy: .95,
    staffs: 4,
    expStaffs: 2
  },
  {
    garageName: 'T. Turner',
    occupancy: .82,
    staffs: 3,
    expStaffs: 3
  },
  {
    garageName: 'D. Taveras',
    occupancy: .81,
    staffs: 2,
    expStaffs: 3
  },
  {
    garageName: 'J. Ivey',
    occupancy: .15,
    staffs: 2,
    expStaffs: 3
  },
  {
    garageName: 'J. Ivey',
    occupancy: .12,
    staffs: 2,
    expStaffs: 3
  },
  {
    garageName: 'A. Jones',
    occupancy: .09,
    staffs: 2,
    expStaffs: 3
  }
]
  const e1: any = {
    id: '5b345cb3ea260d03b87438dd',
    name: 'Thomas E. Dernoga',
    revenueAmt: 18200,
    towedCars: 6,
    transaction: 12,
    street: 7,
    grades: 6,
    sidewalk: 4,
    analyticsQueryIntervalPreset,
    liveQueryIntervalPreset,
    reservationOccupancy
  };

  const bindFunctions = (e: EnterpriseEvent) => {
    e.getAnalyticsCharts = getAnalyticsCharts.bind(e); 
    e.getLiveCharts = getLiveCharts.bind(e); 
    e.getAnalyticsStats = getAnalyticsStats.bind(e);
    e.getLiveStats = getLiveStats.bind(e);
  }
  bindFunctions(e1);

  const e2: any = {
    
    id: '5b345cb3ea260d03b87438de',
    name: 'Todd M. Turner, Chair',
    revenueAmt: 11878,
    towedCars: 445,
    transaction: 943,
    street: 63,
    grades: 42,
    sidewalk: 38,
    analyticsQueryIntervalPreset,
    liveQueryIntervalPreset,
    reservationOccupancy
  };
  bindFunctions(e2);

  const e3: any = {
    id: '5b345cb3ea260d03b87438dd22',
    name: 'Deni L. Taveras',
    revenueAmt: 14300,
    transaction: 1122,
    towedCars: 452,
    street: 98,
    grades: 56,
    sidewalk: 27,
    analyticsQueryIntervalPreset,
    liveQueryIntervalPreset,
    reservationOccupancy
  };
  bindFunctions(e3);
  return [e1, e2, e3];
}

const selectedEnterpriseEventManager = (() => {
  let selectedEnterpriseEvent = getEnterpriseEvents()[0];

  let listeners : any[] = [];

  return {
    get selectedEnterpriseEvent() {
      return selectedEnterpriseEvent;
    },

    addSelectedEnterpriseChangeListener(fn: any) {
      const exists = !!listeners.find(l => l === fn);
      if (!exists) {
        listeners.push(fn);
      }    
    },

    removeSelectedEnterpriseChangeListener(listener: any) {
      listeners = listeners.filter(l => l === listener);
    },

    selectEnterpriseEvent(eventId: string) {
      if (selectedEnterpriseEvent.id === eventId) return;
      const event = getEnterpriseEvents().find(e => e.id === eventId);
      if (!event) return;
      selectedEnterpriseEvent = event;
      listeners.forEach(l => l(event));
    }
  }
})()

export function useSelectEnterpriseEvent() {
  const [E, setE] = useState<any>(selectedEnterpriseEventManager.selectedEnterpriseEvent);

  useEffect(() => {
    const listener = (event: EnterpriseEvent) => {
      setE(event);
    }

    selectedEnterpriseEventManager.addSelectedEnterpriseChangeListener(listener);

    return () => selectedEnterpriseEventManager.removeSelectedEnterpriseChangeListener(listener);
  },[]);

  return {
    enterpriseEvent: E, 
    selectEnterpriseEvent: (eventId: string) => {
      selectedEnterpriseEventManager.selectEnterpriseEvent(eventId);
    }
  }
}
