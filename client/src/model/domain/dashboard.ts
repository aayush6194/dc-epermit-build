import { Opt } from './common';
import { TimeSeries, FlatValue } from './metrics';

export enum Colors {
  green = 'rgb(51, 180, 130)',
  blue = 'rgb(30, 144, 255)',
  orange = 'rgb(255, 127, 80)',
  purple = '#8D6392',
  white =  '#ffffff'
}

export type Screen = 'garage' | 'adminControl' | 'overview' | 'announcement' | 'citation';

export interface Dashboard {
  id: string,
  title: string,
  charts: XyChart[],
  scoreCards: ScoreCard[],
  screen: Screen
}

export interface ScoreCard {
  title: string,
  flatValueQuery: FlatValue.Query,
  backgroundColor: string,
  icon?: string
}

export interface XyChart {
  type: 'lineChart' | 'stackedGraph',
  lineChart?: LineChart,
  stackedGraph?: StackedGraph
}

export interface LineChart {
  title: string,
  timeSeriesQuery: TimeSeries.Query
  backgroundColor: string,
}

export interface StackedGraph {
  title: string,
  timeSeriesQuery: TimeSeries.Query
  backgroundColor: string,
}

export interface ScoreCardDescriptor {
  name: string;
  displayName: string;
  description: string;
  capabilities: string[]
  faIcon: string;
  iconUrl: string;
}

export interface ScoreCardRenderDataItem {
  descriptor: ScoreCardDescriptor,
  value: any,
  isAvailable: boolean
}

export const SCD_PARKED_VEHICLES_PERCENT = 'parked_vehicles_percent';
export const SCD_PARKED_VEHICLES_COUNT = 'parked_vehicles_count';
export const SCD_ACTIVE_GARAGES = 'active_garages';
export const SCD_GARAGE_OCCUPANCIES = 'garage_occupancies';
export const SCD_ACTIVE_ANNOUNCEMENTS = 'active_announcements';
export const SCD_UPCOMING_ANNOUNCEMENTS = 'upcoming_announcements';
export const SCD_CITATION_REVENUE = 'citation_revenue';
export const SCD_CITATION_TRANSACTION_COUNT = 'citation_transaction_count';
export const SCD_CITATION_APPEAL_ATTEMPT = 'citation_appeal_attempt';
export const SCD_CITATION_PARKSTASH_MATCH = 'citation_parkstash_match';
export const SCD_PENDING_USERS = 'pending_users';
export const SCD_ACCEPTED_USERS = 'accepted_users';
export const SCD_TOTAL_USERS = 'total_users';