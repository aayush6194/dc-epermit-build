import { createStore, applyMiddleware } from 'redux';
import  rootReducer  from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getClients } from './actions/clients';
import { getPermits } from './actions/permits';
import { getNotifications } from './actions/notifications';
import { getDispatches } from './actions/dispatches';

const logger = (store : any) =>( next : any) => (action : any) => {
   console.group(action.type)
   console.info('dispatching', action)
   let result = next(action)
   console.log('next state', store.getState())
   console.groupEnd()
   return result
 }

 
const ReduxThunk = require('redux-thunk').default
const store = createStore(rootReducer, composeWithDevTools(
   
applyMiddleware(ReduxThunk, logger)));

store.dispatch(getClients() as any);
store.dispatch(getPermits() as any);
store.dispatch(getNotifications() as any);
store.dispatch(getDispatches() as any);
export default store;