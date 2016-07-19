import { combineReducers } from 'redux'
import teams from './teams'
import gamesByTeamId from './gamesByTeamId'

const rootReducer = combineReducers({
  teams,
  gamesByTeamId
});

export default rootReducer
