import { useLocation } from "react-router";
import queryString from "query-string";

const useQuery = () => {
    const location = useLocation().search;
    const query = queryString.parse(location) as any;


    return {
     query
    };
};


export default useQuery;
