import { combineReducers } from 'redux';
import teamsByDiv from './teamsByDiv';
import gamesByTeamId from './gamesByTeamId';
import divsByYear from './divsByYear';
import gamesByDate from './gamesByDate';

const rootReducer = combineReducers({
  teamsByDiv,
  gamesByTeamId,
  divsByYear,
  gamesByDate
});

export default rootReducer;
