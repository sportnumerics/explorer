import { createAction } from 'redux-actions';
import teams from '../services/teams';

export const FETCH_TEAMS = 'FETCH_TEAMS';

function metaCreator(year, div) {
  return {year, div};
}

let fetchTeams = createAction(FETCH_TEAMS, teams, metaCreator);

export default fetchTeams;

function shouldFetchTeams(state, year, div) {
  return !state.teamsByDiv[teamsKey(year, div)];
}

export function fetchTeamsIfNecessary(year, div) {
  return (dispatch, getState) => {
    if (shouldFetchTeams(getState(), year, div)) {
      dispatch(fetchTeams(year, div));
    }
  }
}

export function teamsKey(year, div) {
  return `${year}_${div}`;
}
