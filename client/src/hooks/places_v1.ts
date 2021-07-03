import { useEffect, useState } from "react";
import api from "../api";
import useDebounce from "./debounce";

type Cood = {
  lat: number;
  lng: number;
};

interface Address {
  city: string;
  country: string;
  zipcode: string;
  street: string;
  state: string;
}
export  interface AddressData {
  geo: Cood;
  formattedAddress: string;
  address?: Address;
}
interface State {
  loading: boolean;
  error: boolean;
  success: boolean;
  addressData : AddressData;
}

const address_components = [
  "route",
  "locality",
  "administrative_area_level_1",
  "country",
  "postal_code",
];

export const usePlaces = (country = '', neededsAll = true) => {
  
  const defaultAddressData = {
    geo: {
      lat: -1,
      lng: -1
    },
    address: {
      city: "",
      country: "",
      zipcode: "",
      street: "",
      state: "",
    },
    formattedAddress: "No Result Found",
  };

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 1500);
  const [state, setState] = useState<State>({
    loading: false,
    success: false,
    error: false,
    addressData : defaultAddressData,
  });

  const getAddressComponent = (addresses: any[], component: string) =>
    addresses.filter((address: any) =>
      address.types.includes(component)
    )[0]

  const hasAllAddressComponent = (addresses: any[], address_components: string[]) =>
    address_components.reduce(
      (acc, curr) =>
        acc &&
        addresses.reduce(
          (ac: boolean, address: any) =>
            ac || address.types?.includes(curr),
          false
        ),
      true
    );

  const formatAddress = (addresses: any) => ({
    street: `${getAddressComponent(
      addresses,
      "street_number"
    )?.short_name || ''} ${getAddressComponent(addresses, "route")?.short_name || ''}`.trim(),
    city: getAddressComponent(addresses, "locality")?.short_name || '',
    state: getAddressComponent(
      addresses,
      "administrative_area_level_1"
    ).short_name || '',
    country: getAddressComponent(addresses, "country")?.short_name || '',
    zipcode: getAddressComponent(addresses, "postal_code")?.short_name || '',
  })

  const getAddress = () => {
    if (searchText.length > 0) {  

      api.getPlaces(searchText)
        .then((res) => {
          if (res.status === "OK" && res?.results?.length > 0) {
            const filteredResults = res.results.filter(({ address_components }: any) =>
              !country || (getAddressComponent(address_components, "country")?.short_name === country)
            )

            if (filteredResults.length === 0) throw new Error('No result')

            const formattedAddress = filteredResults[0].formatted_address;
            const geo = {
              lat: filteredResults[0].geometry.location.lat,
              lng: filteredResults[0].geometry.location.lng,
            } as Cood;

            const addresses = filteredResults[0].address_components;

            if (hasAllAddressComponent(addresses, address_components) || !neededsAll) {
              const address = formatAddress(addresses);
              console.log({ address })
              setState({
                error: false,
                loading: false,
                success: true,
                addressData: {
                  geo,
                  formattedAddress,
                  address,
                },
              });
            }
          } else throw new Error('All Component not found')
        })
        .catch((error) => {
          setState({ loading: false, error: true, success: false, addressData: defaultAddressData });
        });
    }
  };

  useEffect(() => {
    getAddress()
  }, [debouncedSearchText])

  useEffect(() => {
    if(searchText.length > 0){
      setState({ loading: true, error: false, success: false, addressData: defaultAddressData });
    } else {
      setState({ loading: false, error: false, success: false, addressData: defaultAddressData });
    }
  }, [searchText])

  return {
    ...state,
    searchText,
    setSearchText
  };
};

export default { usePlaces };
