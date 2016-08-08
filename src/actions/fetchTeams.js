import fetch from 'isomorphic-fetch';
import FETCH_STATUS from './fetchStatus';
import config from 'config';

export const FETCH_TEAMS = 'FETCH_TEAMS';

function fetchingTeams() {
  return {
    type: FETCH_TEAMS,
    status: FETCH_STATUS.FETCHING
  };
}

function fetchTeamsSuccess(teams) {
  return {
    type: FETCH_TEAMS,
    status: FETCH_STATUS.SUCCESS,
    teams
  };
}

function fetchTeamsError(error) {
  return {
    type: FETCH_TEAMS,
    status: FETCH_STATUS.ERROR,
    error
  };
}

function shouldFetchTeams(state) {
  return !state.teams || !state.teams.isFetching;
}

const baseUrl = `${config.apiUrl}/teams`;

export default function fetchTeams() {
  return function(dispatch) {
    dispatch(fetchingTeams());

    return fetch(baseUrl)
      .then(response => response.json())
      .then(json => dispatch(fetchTeamsSuccess(json.teams)))
      .catch(error => dispatch(fetchTeamsError(error)))
  }
}

export function fetchTeamsIfNecessary() {
  return function(dispatch, getState) {
    if (shouldFetchTeams(getState())) {
      return dispatch(fetchTeams());
    } else {
      return Promise.resolve();
    }
  }
}
