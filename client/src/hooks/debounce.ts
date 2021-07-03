
import { useState, useEffect } from 'react';

const useDebounce = (value: any, delay = 500) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

     
      return () => {
        clearTimeout(handler);
      };
    },
    [value] 
  );

  return debouncedValue;
}

export default useDebounce;