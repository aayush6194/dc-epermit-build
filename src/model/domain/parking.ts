export type BookingTypes = "daily" | "weekly" | "monthly";
export type StandardAmenities =
  | "Covered"
  | "Electric Charging"
  | "CCTV"
  | "Security Camera"
  | "Onsite Staff"
  | "Multiple Entry/Exit"
  | "Multiple Entry Exit"
  | "Drop Off"
  | "Disable Access"
  | "Disabled Access";

export type SpotType = "carport" | "driveway" | "garage" | "other";

interface OldShortUser {
  _id: string;
  user_name: string;
  user_email: string;
  user_phoneno?: string;
  image_url?: string;
  full_image_url?: string;
}
/*Availaibility is derived from ParkingAvailabilitySchedule*/
export type Availability = "always" | "never" | "partial";

export type ParkingScheduleItem = {
  startHour: [number, number];
  endHour: [number, number];
  active: boolean;
};

export type ParkingScheduleWeeklyEntries = [
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem,
  ParkingScheduleItem
];
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}
 
export interface Parking {
  _id: string,
  instruction?: string,
  description: string,
  terms_and_conditions?: string,
  name: string,
  amenities: string[],
  daily_parking: {
   time: ParkingScheduleWeeklyEntries
  },
  hourly: { active: boolean, price: number },
  max_daily: { active: boolean, price: number },
  weekly: { active: boolean, price: number },
  monthly: { active: boolean, price: number },
  security_deposit: { active: boolean, price: number },
  owner: OldShortUser,
  address: Address,
  active: boolean,
  spot_type: SpotType,
  spot_type_other_description?: string,
  geo: [number, number],
  tz: string,
  space_count: number,
  assigned_parking_spot_start: number,
  image_url: string[],                           //full url i.e. not partial as it was
  availability: Availability,
  vehicle_classes: string[]                      //one or more required
  currency: string,
  parking_size: {
    width_ft: number;
    length_ft: number;
  };
  extras?: any;                                  //sent when certain query parameters are provided in certain apis, see below
}
 
export interface AddParkingModel {
  geo: [number, number],
  name: string,
  space_count: number,
  assigned_parking_spot_start: number,
  address: Address,
  instruction?: string,
  availability? : Availability;
  description: string,
  terms_and_conditions?: string,
  spot_type: SpotType,
  spot_type_other_description?: string,
  amenities: string[],
  daily_parking: {
    time: ParkingScheduleWeeklyEntries
  },
  active: boolean,
  weekly: { active: boolean, price: number; },        
  monthly: { active: boolean, price: number; },       
  hourly: { active: boolean, price: number; },        
  max_daily: { active: boolean, price: number; },     
  security_deposit: { active: boolean; price: number;  };
  vehicle_classes: string[]
  currency: string;
  parking_size: {
    width_ft: number;
    length_ft: number;
  };
}
 
export interface EditParkingModel {
  name?: string;
  instruction?: string | null;                          //null to nullify this field
  description?: string;
  availability? : Availability;
  terms_and_conditions?: string | null;                 //null to nullify this field
  space_count?: number;
  assigned_parking_spot_start?: number;
  spot_type?: SpotType;
  spot_type_other_description?: string;
  daily_parking?: {
    time: ParkingScheduleWeeklyEntries
  },
  hourly?: { active: boolean, price: number; },
  max_daily?: { active: boolean, price: number; },
  weekly?: { active: boolean, price: number; },
  monthly?: { active: boolean, price: number; },
  security_deposit?: { active: boolean, price: number },
  active?: boolean,
  amenities?: string[],
  vehicle_classes?: string[]
  currency?: string;
  parking_size?: {
    width_ft: number;
    length_ft: number;
  };
}
 
export interface SearchNearbyParkingQuery {
  lat: number;
  long: number;
  start_date: string;                           //yyyy-mm-dd
  end_date: string;                             //yyyy-mm-dd
  start_hour?: string;                          //HH:mm e.g. 13:00; only if booking_type === 'daily'
  end_hour?: string;                            //HH:mm e.g. 13:00; only if booking_type === 'daily'
  booking_type: BookingTypes;                   //previously named 'filter'
  amenities?: string[];                         //empty array or undefined or null mean the same thing
  vehicle_classes?: string[];                   //empty array or undefined or null mean the same thing
}
 
export interface NearbyParking {
  _id: string,
  booking_type: BookingTypes,
  isSold: boolean,
  name: string,                                          
  space_count: number,
  geo: [number, number],
  owner: OldShortUser,
  image_url: string[],                                   
  spot_type: SpotType,                                  
  rate: number,                                        
  max_daily_rate: number,                             
  total: number,                                     
  avg_host_rating: number,
  review_count: number,
  rating_count: number
}
 
export interface HostRating {
  rating: number,
  review?: string,
  created_at: Date,
  driver: OldShortUser,
}
 
export interface HostRatingSummary {
  avg_host_rating: number;
  review_count:    number;
  rating_count:    number;
}
 
export interface AmenityDescriptor {
  name: string;
  displayName: string;
  oldNames: string[];
  imageUrl: string;
}
 
export interface CurrencyDescriptor {
  name: string;
  displayName: string;
}
 
export interface VehicleClassDescriptor {
  name: string;
  displayName: string;
  category: string;
  parkingDimenW: number;
  parkingDimenL: number;
  imageUrl: string;
}
 
export interface VehicleClassCategoryDescriptor {
  name: string;
  displayName: string;
}