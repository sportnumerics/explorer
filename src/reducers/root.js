import { combineReducers } from 'redux'
import teamsByDiv from './teamsByDiv'
import gamesByTeamId from './gamesByTeamId'

const rootReducer = combineReducers({
  teamsByDiv,
  gamesByTeamId
});

export default rootReducer
