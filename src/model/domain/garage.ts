import { Opt } from './common';

export interface Garage {
  id: string,
  name: string,
  description: Opt<string>,
  address: string,
  geo: [number, number],
  tz: string,
  active: boolean,
  maxOccupancy: number,
  occupancyTableId: Opt<string>,
  occupancyUpdateSource: 'table' | 'integration',
  imageUrl: string[];
  occupancy?: {
    updatedAt: Date;
    count: number;
  },
  abnormality: {
    active: boolean;
    percent: number;
  }
}
export interface GarageOccupancyTableItem
{
  interval: { startHour: [number, number], endHour: [number, number ] },

  //this is a floating point value between 0 and 1
  occupancy: number
}

export interface GarageOccupancyTableEntries {
  sun: GarageOccupancyTableItem[],
  mon: GarageOccupancyTableItem[],
  tue: GarageOccupancyTableItem[],
  wed: GarageOccupancyTableItem[],
  thur: GarageOccupancyTableItem[],
  fri: GarageOccupancyTableItem[],
  sat: GarageOccupancyTableItem[]
}

export interface GarageOccupancyTable
{
  id: string,
  title: string,
  table: GarageOccupancyTableEntries
}