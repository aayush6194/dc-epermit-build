import { createStore, applyMiddleware } from 'redux';
import  rootReducer  from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getClients } from './actions/clients';

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
export default store;