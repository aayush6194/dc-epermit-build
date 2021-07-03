import { useState  } from "react";
import logger from "../utils/logger";

type Cood = {
    lat: number,
    lng: number
}

export const usePlaces = () => {
    const origin = { lat: 32, lng: -92 };
    const defaultSearch = {
        found: false,
        result: "",
        resultLocation: origin,
    }
    const [ error, setError] = useState(true);
    const [search, setSearch] = useState(defaultSearch);
    const [ searchText, setSearchText] = useState("");

    const getAddress = (addr: string) => {
        setError(true)
        const url = `https://findparkstash.com/google/geocode/?address=${addr}`;
        if (addr && addr.length > 0)
            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    if (res.status === "OK" && res.results && res.results.length > 0) {
                        const result = res.results[0].formatted_address;
                        const resultLocation = {
                            lat: res.results[0].geometry.location.lat,
                            lng: res.results[0].geometry.location.lng,
                        } as Cood;
                        setSearch({ ...search, result, resultLocation, found: true });
                    } else throw new Error();
                })
                .catch((e) => {
                    logger.log(e)
                    setSearch({ ...search, result: "No Result", found: false })
                });
        else setSearch({ ...search, result: "" });
    };

    const resetSearch = () => setSearch(defaultSearch);
    const selectResult = (result : string)=>{
        setSearchText(result);
        setError(false)
    }

    return {
        searchText,
        search,
        error,
        selectResult,     
        resetSearch,
        getAddress,
        setSearchText
    };
};

export default {
    usePlaces
};
