import { FETCH_GAMES } from '../actions/fetchGames'
import handleFetch from '../utils/handleFetch';

function gamesByTeamId(state = {}, action) {
  if (action.type == FETCH_GAMES) {
    return Object.assign({}, state, {
      [action.meta.teamId]: handleFetch(state[action.meta.teamId], action)
    });
  }
  return state;
}

export default gamesByTeamId
