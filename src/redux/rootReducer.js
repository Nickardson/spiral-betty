import { combineReducers } from 'redux'
import editing from './reducers/editing'
import img from './reducers/img'
import setup from './reducers/setup'

export default combineReducers({
  editing,
  img,
  setup
})