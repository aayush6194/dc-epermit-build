import { useState, useEffect } from 'react';

export default function usePromise<T>(promise: Promise<T>): { data: T | null, error: Error | null, loading: boolean; } {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    promise
      .then(result => {
        setState({
          data: result,
          error: null,
          loading: false
        })
      })
      .catch(error => {
        setState({
          data: null,
          error: error,
          loading: true
        })
      });
  }, [promise])

   return state;
}