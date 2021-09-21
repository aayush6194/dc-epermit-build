import moment from "moment";
import { defaultLocation } from "../../config";
import { AddressData } from "../../hooks/places_v1";

const now = moment();
const later = moment().add("hours", 2);

interface Location {
  lat: number;
  lng: number;
  address: string;
}
export interface SearchNearbyQuery {
  long: number;
  lat: number;
  start_date: string;
  amenities?: string[],
  end_date: string;
  end_hour?: string;
  start_hour?: string;
  vehicle_classes: string[];
  booking_type: "daily" | "weekly" | "monthly";
}

export interface SearchStoreState {
  query: SearchNearbyQuery;
  addressData: Partial<AddressData>;
  locations: Location[];
  error: boolean;
  loading: boolean;
}
interface Actions {
  type: ActionTypes;
  payload: Partial<SearchStoreState>;
}

const intialState: SearchStoreState = {
  query: {
    long: -1,
    lat: -1,
    start_date: now.format("YYYY-MM-DD"),
    end_date: later.format("YYYY-MM-DD"),
    start_hour: now.format("HH:mm"),
    end_hour: later.format("HH:mm"),
    amenities: [],
    booking_type: "daily",
    vehicle_classes: ["mid_size_car"],
  },
  locations: [],
  addressData: {
    formattedAddress: '',
    geo: defaultLocation
  },
  error: false,
  loading: false,
};

export enum ActionTypes {
  SET_SEARCH = "SET_SEARCH",
  SET_ADDRESS_DATA = "SET_ADDRESS_DATA",
 // SET_START_DATE = 'SET_START_DATE'
}

export default function rootReducer(state = intialState, action: Actions): any {
  switch (action.type) {
    case ActionTypes.SET_SEARCH:
      return { ...state, query: { ...state.query, ...action.payload.query } };

      case ActionTypes.SET_ADDRESS_DATA:
        return { ...state, 
          addressData: { ...state.addressData, ...action.payload.addressData },
          locations: [...state.locations, {
            lat: action?.payload?.addressData?.geo?.lat,
            lng: action?.payload?.addressData?.geo?.lng,
            address: action?.payload?.addressData?.formattedAddress
          }]
      };
    default:
      return state;
  }
}
