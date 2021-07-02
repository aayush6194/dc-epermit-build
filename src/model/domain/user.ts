import { Opt } from './common';

export interface User {
  id: string,
  name: string,
  shortName: string,
  email: string,
  phone: Opt<string>,
  imageUrl: Opt<string>,
  apps: {
    coreApp: 'phoneRequired' | 'phoneVerificationRequired' | 'enabled',
    enterpriseApp: 'onboardRequestRequired' | 'onboarding' | 'enabled'
  }
}

export interface EnterpriseUser {
  user: User,
  role: EnterpriseUserRole
}

export interface CoreAppUser {
  user: User,
  promos: { promoId: string, timesUsed: number }[],
  parkstashWallet: {
    earnings: number,
    recharge: number,
    refund: number,
    promo: number,
    referralEarnings: number,
    pendingEarnings: number
  },
  referralInviteCode: string,
  hostReferralInviteCode: string,
  driverReferralInviteCode: string
}

export enum EnterpriseUserRole {
  admin = 'admin', 
  member = 'member' 
}

export enum UserAuthType {
  google = 'google', 
  facebook = 'facebook', 
  password = 'password' 
}