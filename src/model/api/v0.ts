import { User as User_ } from '../domain/user';
import { ParkingScheduleWeeklyEntries } from '../domain/parking_schedule';

export type FalseResponseStatus = 400 | 401 | 403 | 404 | 500 | 501;

export interface BaseRequest {
  query: any;
  params: any;
  url: string;
  method: string;
  body: any;
  user: User_;
}

export type FalseResponse =  {
  status: FalseResponseStatus,
  body: {
    success: false;
    message: string;
    [key: string]: boolean | number| string;
  }
};

//POST /users/number
export interface Req_AddPhoneno extends BaseRequest {
  body: { user_phoneno: string }
}

export type Res_AddPhoneno = {
  status: 200,
  body: { success: true  }  
} | FalseResponse;


//POST /users/number/assert-verification
export interface Req_AssertPhonenoVerification extends BaseRequest {
  body: { otp: number }
}

export type Res_AssertPhonenoVerification = {
  status: 200,
  body: { success: true  }  
} | FalseResponse;


//@deprecated
//POST /users/number/request-verification
export interface Req_RequestPhonenoVerification extends BaseRequest {}

export type Res_RequestPhonenoVerification = {
  status: 200,
  body: { success: true }
} | FalseResponse;

//POST /users/password/forgot
export interface Req_RequestForgotPassword extends BaseRequest {
  body: { user_email: string; }
}

export type Res_RequestForgotPassword = {
  status: 200,
  body: { 
    success: true
  }
} | FalseResponse;

//POST /users/password/verify-forgot
export interface Req_VerifyForgotPassword extends BaseRequest {
  body: {
    user_email: string;
    otp: number;
  }
}

export type Res_VerifyForgotPassword = {
  status: 200,
  body: {
    success: true,
    token: string
  }
} | FalseResponse;

//POST /users/password/change
export interface Req_ChangePassword extends BaseRequest {
  body: {
    user_password: string;
  }
}

export type Res_ChangePassword = {
  status: 200,
  body: { success: true }
} | FalseResponse;

// GET /users
export interface Req_GetMe extends BaseRequest {}

export type Res_GetMe = {
  status: 200;
  body: {
    success: true;
    user_details: User;  
  }
} | FalseResponse;

// POST /users/images
export interface Req_AddProfileImage extends BaseRequest {
  body: {
    image: string;
  }
}
export type Res_AddProfileImage = {
  status: 200;
  body: { success: true; image_url: string; };
} | FalseResponse;

// DELETE /users/images
export interface Req_RemoveProfileImage extends BaseRequest {}
export type Res_RemoveProfileImage = {
  status: 200;
  body: { success: true };
} | FalseResponse;

// POST /users/parking-schedule
export interface Req_AddParkingSchedule extends BaseRequest {
  body: { parking_schedule: ParkingScheduleWeeklyEntries }
}
export type Res_AddParkingSchedule = {
  status: 200;
  body: { success: true };
} | FalseResponse;

// POST /users/help
export interface Req_CreateHelpTicket extends BaseRequest {
  body: { message: string; }
}
export type Res_CreateHelpTicket = {
  status: 200;
  body: { success: true };
}

// POST /users/firebase-token
export interface Req_AddFirebaseToken extends BaseRequest {
  body: { firebase_token: string; }
}
export type Res_AddFirebaseToken = {
  status: 200;
  body: { success: true };
}

// POST /users
export interface Req_Signup extends BaseRequest {
  body: {
    user_password?: string | null;
    user_email: string;
    user_phoneno?: string | null;
    user_name?: string | null;
  }
 }

export type Res_Signup = {
  status: 200;
  body: {
    success: true;
    token: string;
    user_details: User;
  };
 } | FalseResponse; 

export interface Req_ListHostReferrals extends BaseRequest {
  body: { message: string; }
}
export type Res_ListHostReferrals = {
  status: 200;
  body: { 
    success: true;
    potential_earnings: number;
    total_referral_earnings: number;
    available_for_payout: number;
    referrals: {
      referee: ShortUser;
      booking_amount: number;
      reward: number;
      has_listed_space: number;
      completed_at: Date;
    }[]
  };
}

//POST /promos/apply
export interface Req_ApplyPromo extends BaseRequest {
  body: {
    promo_name: string;
  }
}
export type Res_ApplyPromo = {
  status: 200;
  body: {
    success: true;
    message: string;
  };
} | FalseResponse;


//POST /api/login
export interface Req_Login extends BaseRequest {
  body: {
    user_email: string;
    user_password: string;
  }
}
export type Res_Login = {
  status: 200,
  body: {
    success: true,
    user_details: User,
    token: string
  }
} | FalseResponse;

//POST /api/oauth-login
export interface Req_OauthLogin extends BaseRequest {
  body: {
    fb_id?: string;
    google_id?: string;
    user_email: string;
    user_name: string;
  }
}
export type Res_OauthLogin = {
  status: 200;
  body: {
    success: true,
    user_details: User,
    token: string;
  };
} | FalseResponse;

//TODO: make sure that this definition is complete
export interface User {
  _id: string;
  user_name: string;
  user_email: string;
  user_phoneno?: string | null;
  otp_verified: boolean;
  parkstash_wallet: {
    earnings: number;
    recharge: number;
    refund: number;
    promo: number;
    referral_earnings: number;
    pending_earnings: number;
  };
  parking_schedule: ParkingScheduleWeeklyEntries | null;
  image_url?: string | null;
  host_referral_invite_code: string;
  driver_referral_invite_code: string;
  stripe_acc_id?: string | null;
}

export interface ShortUser {
  _id: string;
  user_name: string;
  user_email: string;
  user_phoneno: string;
  image_url: string | null;
}