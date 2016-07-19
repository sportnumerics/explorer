import fetch from 'isomorphic-fetch';

export const FETCH_TEAMS = 'FETCH_TEAMS';

export const FETCH_STATUS = {
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

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

const teamsUrl = 'http://localhost:4000/teams';

export function fetchTeams() {
  return function(dispatch) {
    dispatch(fetchingTeams());

    return fetch(teamsUrl)
      .then(response => response.json())
      .then(json => dispatch(fetchTeamsSuccess(json.teams)))
      .catch(error => dispatch(fetchTeamsError(error)))
  }
}
