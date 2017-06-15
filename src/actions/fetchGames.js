import { createAction } from 'redux-actions';
import gamesByTeamId from '../services/gamesByTeamId';

export const FETCH_GAMES = 'FETCH_GAMES';

function metaCreator(year, teamId) {
  return {year, teamId};
}

let fetchGamesByTeamId = createAction(FETCH_GAMES, gamesByTeamId, metaCreator);

export default fetchGamesByTeamId

export function gamesKey(year, teamId) {
  return `${year}_${teamId}`;
}
