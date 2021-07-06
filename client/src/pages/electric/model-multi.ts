import moment from 'moment';
import { useState, useEffect } from 'react';
import { defaultInterval } from '../../utils/time';

function getChartsForEvent() {
  const me: any = this;

  const chart = (title: string, metricType: string, chartType: string) => ({
    title,
    timeSeriesQuery: {
      metricType,
      resourceIds: [me.id],
      crossSeriesReducer: 'SUM',
      alignment: {
        alignmentPeriod: '1d',
        alignmentReducer: 'SUM'
      },
      interval: {
        startTime: moment(me.start).add('day', -7).toISOString(),
        endTime: me.end.toISOString(),
      }
    },
    backgroundColor: '#FFFFFF',
    xAxisLabel: 'T',
    yAxisLabel: 'Occupancy',
    chartTypes: [chartType]
  });

  return [
    chart('Revenue by Type', 'event_revenue', 'stackedBar'),
    chart('Number of Citations', 'event_transaction_count', 'multiLine'),
    chart('Towings Per Garages', 'event_reservation_occupancy', 'stackedBar')
  ];
};

export interface EnterpriseEvent {
  id: string;
  name: string;
  start: Date;
  end: Date;
  getCharts: { (): Array<any> };
  analytics: {
    revenue: { normal: number; dynamic: number; total: number; }
    transaction: number;
    queryInterval: {
      start: Date;
      end: Date;
    }
  };
  live: {
    revenue: { normal: number; dynamic: number; total: number; }
    transaction: number;
    queryInterval: {
      start: Date;
      end: Date;
    }
  };
  reservationOccupancy: {
    garageName: string;
    occupancy: number;
    staffs: number;
  }[]
}

export function getEnterpriseEvent(eventIds: string[]) {
  return getEnterpriseEvents().filter(e => eventIds.includes(e.id));
}

export function getEnterpriseEvents(): EnterpriseEvent[] {
  const start = new Date(Date.UTC(2020, 8, 1))
  const end = new Date(Date.UTC(2020, 8, 10));
 const reservationOccupancy =  [
      {
        garageName: 'Thomas E. Dernoga',
        occupancy: .25,
        staffs: 4,
        expStaffs: 2
      },
      {
        garageName: 'Garage 2',
        occupancy: .25,
        staffs: 3,
        expStaffs: 3
      },
      {
        garageName: 'Garage 3',
        occupancy: .5,
        staffs: 2,
        expStaffs: 3
      }
    ]
  const e1: any = {
    id: '5b345cb3ea260d03b87438dd',
    name: 'Thomas E. Dernoga',
    start,
    end,
    analytics: {
      revenue: { normal: 2280 * 100, dynamic: 5655 * 100, total: 2280 * 100 + 5655 * 100 },
      transaction: 633,
      queryInterval: { start, end }
    },
    live: {
      revenue: { normal: 228 * 100, dynamic: 565 * 100, total: 228 * 100 + 565 * 100  },
      transaction: 63,
      queryInterval:  defaultInterval()
    },
    reservationOccupancy 
  };
  e1.getCharts = getChartsForEvent.bind(e1);

  const e2: any = {
    id: '5b345cb3ea260d03b87438de',
    name: 'Todd M. Turner, Chair',
    start,
    end,
    analytics: {
      revenue: { normal: 2280 * 100, dynamic: 5655 * 100, total: 2280 * 100 + 5655 * 100 },
      transaction: 633,
      queryInterval: { start, end }
    },
    live: {
      revenue: { normal: 228 * 100, dynamic: 565 * 100, total: 228 * 100 + 565 * 100  },
      transaction: 63,
      queryInterval:  defaultInterval()
    },
    reservationOccupancy 
  };

  e2.getCharts = getChartsForEvent.bind(e2);
  return [e1, e2];
}

const selectedEnterpriseEventManager = (() => {
  let selectedEnterpriseEvent = [getEnterpriseEvents()[0]];

  let listeners = [];

  return {
    get selectedEnterpriseEvent() {
      return selectedEnterpriseEvent;
    },

    addSelectedEnterpriseChangeListener(fn) {
      const exists = !!listeners.find(l => l === fn);
      if (!exists) {
        listeners.push(fn);
      }    
    },

    removeSelectedEnterpriseChangeListener(listener) {
      listeners = listeners.filter(l => l === listener);
    },

    selectEnterpriseEvent(eventIds: string[]) {
      //if (selectedEnterpriseEvent.id === eventId) return;
      const event = getEnterpriseEvents().filter(e => eventIds.includes(e.id));
      if (!event) return;
      selectedEnterpriseEvent = event;
      listeners.forEach(l => l(event));
    }
  }
})()

export function useSelectEnterpriseEvent() {
  const [E, setE] = useState(selectedEnterpriseEventManager.selectedEnterpriseEvent);

  useEffect(() => {
    const listener = (event: EnterpriseEvent[]) => {
      setE(event);
    }

    selectedEnterpriseEventManager.addSelectedEnterpriseChangeListener(listener);

    return () => selectedEnterpriseEventManager.removeSelectedEnterpriseChangeListener(listener);
  },[]);

  return {
    enterpriseEvent: E, 
    selectEnterpriseEvent: selectedEnterpriseEventManager.selectEnterpriseEvent
  }
}