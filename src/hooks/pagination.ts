import  { useState, useEffect } from 'react';
const usePagination = (len: number, max: number)=> {   
    const [ length, setLength ] = useState(len) 
    const [ page, setPage ] = useState(0);    
    const maxPage = Math.ceil(length / max);
    const canGoBack = page > 0;
    const canGoForward = page < (maxPage -1)
    
    const backward = ()=> canGoBack && setPage(page - 1)
    
    const forward = ()=> canGoForward && setPage(page + 1)


    useEffect(()=> {
        setLength(len);
        if(page + 1 > len){
            setPage(0)
        }
    }, [len]);
    return {
        page,
        needsPagination: maxPage > 1,
        canGoBack,
        canGoForward,
        actions: {
            forward, backward
        }
    }

}

export default usePagination;