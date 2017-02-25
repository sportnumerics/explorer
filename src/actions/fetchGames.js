import { createAction } from 'redux-actions';
import gamesByTeamId from '../services/gamesByTeamId';

export const FETCH_GAMES = 'FETCH_GAMES';

function metaCreator(div, teamId) {
  return {div, teamId};
}

let fetchGamesByTeamId = createAction(FETCH_GAMES, gamesByTeamId, metaCreator);

export default fetchGamesByTeamId
