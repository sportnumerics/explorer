import { FETCH_TEAM_GAMES, gamesKey } from '../actions/fetchTeamGames';
import handleFetch from '../utils/handleFetch';

function gamesByTeamId(state = {}, action) {
  if (action.type == FETCH_TEAM_GAMES) {
    let key = gamesKey(action.meta.year, action.meta.teamId);
    return Object.assign({}, state, {
      [key]: handleFetch(state[key], action)
    });
  }
  return state;
}

export default gamesByTeamId;
