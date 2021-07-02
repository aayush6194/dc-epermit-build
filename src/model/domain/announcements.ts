import { At } from './common';

export interface Announcement {
  id: string,
  title: string,
  body: string,
  launchAt: At;
  importance: AnnouncementImportance; 
  expiresAt?: At;
  status: 'active' | 'expired' | 'upcoming';
}

export interface AddAnnouncement {
  title: string;
  body: string;
  launchAt: Date;
  expiresAt?: Date;
  importance?: AnnouncementImportance;
}

export interface EditAnnouncement {
  title?: string,
  body?: string,
  expiresAt?: Date | null,
  importance?: AnnouncementImportance;
}

export type AnnouncementImportance = 'high' | 'normal';

export type AnnouncementImportanceLegend = { [key in AnnouncementImportance]: { label: string; bgColor: string; } };
