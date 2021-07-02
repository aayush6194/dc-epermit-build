import { At } from './common';

export type Status_Write = 'active' | 'inactive' | 'closed'; 
export type Status_Read = Status_Write | 'count_not_available';
export type OccupancySourceType = 'none' | 'table' | 'integration' | 'abnormality_fallback_reference';
export type AbnormalityReferenceType = 'recentAggregate' | 'pastYear';

export interface Garage {
  id: string,
  name: string,
  description?: string,
  address: string,
  geo: [number, number],
  tz: string,
  status: Status_Read,
  integrationTag: string;
  imageUrl: string[];
  occupancy: {
    sourceType: OccupancySourceType;
    tableId?: string;
    maxCount: number;
    current?: {
      updatedAt: At;
      count: number;
    }
  };
  abnormality: {
    active: boolean;
    baselinePercent: number;
    referenceType: AbnormalityReferenceType;
    customReferenceAt?: At;
    isCustomReferenceAvailable: boolean;
    isPastYearReferenceAvailable: boolean;
    isRecentAggregateReferenceAvailable: boolean;
  };
  extras?: {
    statusText: string;
    detailText: string;
    displayColor: string;
  };
}

export interface GarageOccupancyTableItem {
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

export interface GarageOccupancyTable {
  id: string,
  title: string,
  table: GarageOccupancyTableEntries
}

export interface AbnormalOccupancyEvent {
  at: At;
  garageId: string;
  abnormalityReferenceType: AbnormalityReferenceType;
  abnormalityBaseline: number;
  expectedOccupancyPercent: number;
  receivedOccupancyPercent: number;
}

export interface AddGarageModel {
  name: string,
  description?: string,
  address: string,
  geo: [number, number],
  tempImageFilenames?: string[];
  occupancy: {
    sourceType: 'none' | 'table' | 'integration';
    tableId?: string;
    maxCount: number;
  };
  abnormality?: {
    active: boolean;
    baselinePercent: number;
    referenceType: AbnormalityReferenceType;
    customReferenceAt?: Date;
  };
}

export interface UpdateGarageModel {
  name?: string;
  description?: string | null;
  status?: Status_Write;
  tempImageFilenames?: string[];
  removeImageUrl?: string[];
  occupancy?: {
    sourceType?: 'none' | 'table' | 'integration';
    tableId?: string | null;
    maxCount?: number;
  }
  abnormality?: {
    active?: boolean;
    baselinePercent?: number;
    referenceType?: AbnormalityReferenceType;
    customReferenceAt?: Date;
  }
}