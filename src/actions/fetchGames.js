import fetch from 'isomorphic-fetch';
import FETCH_STATUS from './fetchStatus';
import config from 'config';

export const FETCH_GAMES = 'FETCH_GAMES';

function fetchingGames(teamId) {
  return {
    type: FETCH_GAMES,
    status: FETCH_STATUS.FETCHING,
    teamId
  };
}

function fetchGamesSuccess(teamId, games) {
  return {
    type: FETCH_GAMES,
    status: FETCH_STATUS.SUCCESS,
    teamId,
    games
  };
}

function fetchGamesError(teamId, error) {
  return {
    type: FETCH_GAMES,
    status: FETCH_STATUS.ERROR,
    teamId,
    error
  };
}

const baseUrl = `${config.apiUrl}/teams`;

export function fetchGamesForTeamId(teamId) {
  return function(dispatch) {
    dispatch(fetchingGames(teamId));

    let url = `${baseUrl}/${teamId}/schedule`;

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(fetchGamesSuccess(teamId, json.schedule)))
      .catch(error => dispatch(fetchGamesError(teamId, error)))
  }
}
