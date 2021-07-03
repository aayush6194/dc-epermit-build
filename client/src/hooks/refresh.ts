import { useState, useEffect  } from "react";
  
export const useRefresh = ()=> {  
    const [ refresh, setRefresh ] = useState(true);

    useEffect(()=>{if(!refresh)setRefresh(true)}, [ refresh])

    return {
        needsRefresh: refresh,
        refresh: ()=>{console.log("refreshing"); setRefresh(true)}
    };

}