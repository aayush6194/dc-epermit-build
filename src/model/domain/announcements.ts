import { Opt } from './common';

export interface Announcement
{
  id: string,
  title: string,
  body: string,
  launchAt: Date,
  expiresAt: Opt<Date>,
  status: 'active' | 'expired'
}