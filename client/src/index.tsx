import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';
import  { BrowserRouter as Router }  from 'react-router-dom';
import Providers from './providers';
import { config } from 'platyplex_ui';
import * as defaultConfig from './config'

config.setProps(defaultConfig);
Sentry.init({dsn: "https://66ec245dbeed4c95a166a788bcf4f7ae@o410541.ingest.sentry.io/5284571"});

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Router>
    <App />
    </Router>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();