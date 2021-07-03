import { combineReducers } from 'redux'
import clients from './clients'
import permits from './permit'

export default combineReducers({
 clients,
 permits
})