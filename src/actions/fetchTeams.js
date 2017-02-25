import { createAction } from 'redux-actions';
import teams from '../services/teams';

export const FETCH_TEAMS = 'FETCH_TEAMS';

function metaCreator(div) {
  return {div};
}

let fetchTeams = createAction(FETCH_TEAMS, teams, metaCreator);

export default fetchTeams

function shouldFetchTeams(state, div) {
  return !state.teamsByDiv[div];
}

export function fetchTeamsIfNecessary(div) {
  return (dispatch, getState) => {
    if (shouldFetchTeams(getState(), div)) {
      dispatch(fetchTeams(div));
    }
  }
}
