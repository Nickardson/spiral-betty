import { combineReducers } from 'redux'
import editing from './reducers/editing'
import preview from './reducers/preview'
import img from './reducers/img'
import filter from './reducers/filter'
import setup from './reducers/setup'
import temp from './reducers/temp'

export default combineReducers({
  editing,
  preview,
  img,
  filter,
  setup,
  temp
})