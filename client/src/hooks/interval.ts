import { useEffect, useState } from "react";

const useInterval= (func: ()=> void, intervalTime = -1) => {

    useEffect(() => {
        if (intervalTime && intervalTime > 0.01) {
          const interval = setInterval(func, intervalTime * 60 * 1000);
    
          return () => {
            clearInterval(interval);
          };
        }
      }, []);

};


export const useTimedInterval= (func: ()=> void, intervalTime = -1) => {

  const [ time, setTime ] = useState(intervalTime * 60);
  useEffect(() => {
      if (typeof intervalTime === 'number' &&  time > 0.01) {
        const seconds = time;
        console.log(seconds)
        const timeout = setTimeout(()=> {
          setTime(seconds - 1)
        }, 1000)
        return () => {
          clearTimeout(timeout);
        };
      } else func();
    }, [ time ]);


    return {
      reset: ()=> setTime(intervalTime * 60)
    }

};

export default useInterval;
