import React, {  useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { Loader } from 'platyplex_ui';
import { Home,   Client, PermitsCalpoly  } from './pages';
import logo from './assets/parkstash_logo.png'
import { useSelector } from 'react-redux';
import { Client as ClientType } from './store/reducer/clients';

export const toRoute = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

function App() {
  const [ state, setState ] = useState({loading: true});
  const { clients } = useSelector((s: any) => s.clients);
  useEffect(()=>{ 
      setTimeout(()=>setState({...state, loading: false}), 2000)
}, []);

  return (
   !state.loading? <ErrorBoundary>
        <Switch> 
          {clients.map((c: ClientType) => (
          <Route exact path={`/e-permits/:id`} render={() => <PermitsCalpoly client={c}/>} />))}

          <Route exact path="/e-permits" render={() => <PermitsCalpoly/>} />
          <Route exact path="/client" render={() => <Client/>} />
          <Route path="/" render={() => <Home/>} />
        </Switch>
    </ErrorBoundary>: <Loader.Custom logo={logo} />
  );
}

export default App;