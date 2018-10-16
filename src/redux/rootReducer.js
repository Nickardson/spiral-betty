import { combineReducers } from 'redux'
import editing from './reducers/editing'
import img from './reducers/img'
import filter from './reducers/filter'
import setup from './reducers/setup'

export default combineReducers({
  editing,
  img,
  filter,
  setup
})