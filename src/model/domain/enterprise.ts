import { Opt } from './common';

export interface EnterpriseRole {
  name: string;
  description?: string;
  editable?: boolean;
  capabilities: string[];
}

export interface Enterprise
{
  id: string;
  title: string;
  tz: string;
  geo: [number, number];
  imageUrl: string;
  imageUrl_mapMarker: string;
  busUrl?: string;
  roles?: EnterpriseRole[];
  capabilities?: string[];
  
}

export interface EnterpriseCapabilityDescriptor {
  name: string;
  displayName: string;
  description: string;
}