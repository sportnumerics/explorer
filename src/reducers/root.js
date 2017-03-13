import { combineReducers } from 'redux'
import teamsByDiv from './teamsByDiv'
import gamesByTeamId from './gamesByTeamId'
import divsByYear from './divsByYear'

const rootReducer = combineReducers({
  teamsByDiv,
  gamesByTeamId,
  divsByYear
});

export default rootReducer
