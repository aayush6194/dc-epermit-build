import { AddressData } from "../../hooks/places_v1";
import { ActionTypes, SearchNearbyQuery } from "../reducer/search";

const defaultQuery = {
  amenities: [],
  vehicle_classes: [],
  booking_type: "daily",
};

export const setQuery = (query: Partial<SearchNearbyQuery>) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionTypes.SET_SEARCH,
      payload: { query },
    });
  };
};

export const setAddressData = (addressData: Partial<AddressData>) => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionTypes.SET_ADDRESS_DATA,
      payload: { addressData },
    });

    dispatch({
      type: ActionTypes.SET_SEARCH,
      payload: { query : {
        geo: [addressData.geo?.lng,  addressData.geo?.lat, ],
        lat: addressData.geo?.lat,
        long: addressData.geo?.lng
      } },
    });
  };
};


export const setDefault = () => {
  return async (dispatch: any) => {
    dispatch({
      type: ActionTypes.SET_SEARCH,
      payload: { query: defaultQuery },
    });
  };
};
