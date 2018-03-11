import { createAction } from 'redux-actions';
import gamesByTeamId from '../services/gamesByTeamId';

export const FETCH_GAMES = 'FETCH_GAMES';

function metaCreator(year, teamId) {
  return {year, teamId};
}

let fetchGamesByTeamId = createAction(FETCH_GAMES, gamesByTeamId, metaCreator);

export default fetchGamesByTeamId

function shouldFetchGames(state, year, teamId) {
  return !state.gamesByTeamId[gamesKey(year, teamId)];
}

export function fetchGamesIfNecessary(year, teamId) {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), year, teamId)) {
      return dispatch(fetchGamesByTeamId(year, teamId));
    }
  }
}

export function gamesKey(year, teamId) {
  return `${year}_${teamId}`;
}
