import { combineReducers } from 'redux'
import clients from './clients'
import permits from './permit'
import search from './search';
import notifications from './notifications';
import dispatches from './dispatches';
export default combineReducers({
 clients,
 permits,
 search,
 notifications,
 dispatches
})