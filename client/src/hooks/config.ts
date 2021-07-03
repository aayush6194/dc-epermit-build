import { useState, useEffect } from 'react';
import API from '../api'

import { asyncHandler } from "../utils";

interface State {
  config? : any;
  loading: boolean;
  error: boolean; 
}
export const useConfig= () => {
  const [state, setter] = useState<State>({
    config: undefined,
    loading: false,
    error: false,
  });

  const setState = (obj: any) => setter({ ...state, ...obj });

  const getConfig = async() => {
    setState({ loading: true, error: false });
    const {config, success } = await asyncHandler({
      apiCall: () => API.getConfig(),
    });
    setState({ loading: false, error: !success, config });
  };



  useEffect(() => {
      getConfig();
  }, []);

  return state;
};

export default useConfig;
