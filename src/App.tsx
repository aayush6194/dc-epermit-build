import React, {  useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { Loader } from 'platyplex_ui';
import logo from './assets/parkstash_logo.png'
import { useSelector } from 'react-redux';
import { Client as ClientType } from './store/reducer/clients';
import Signup from './pages/signup';
import History from './pages/history';
export const toRoute = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

function App() {
  const [ state, setState ] = useState({loading: true});
  const { clients } = useSelector((state: any) => state.clients);
  useEffect(()=>{ 
      setTimeout(()=>setState({...state, loading: false}), 2000)
}, []);

  return (
   !state.loading? <ErrorBoundary>
        <Switch> 
        <Route path="/history" render={() => <History/>} />
          <Route path="/" render={() => <Signup/>} />

      

        </Switch>
    </ErrorBoundary>: <Loader.Custom logo={logo} />
  );
}

export default App;