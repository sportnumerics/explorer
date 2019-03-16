import {
  FETCH_GAMES_BY_DATE,
  gamesByDateKey
} from '../actions/fetchGamesByDate';
import handleFetch from '../utils/handleFetch';

function gamesByDate(state = {}, action) {
  if (action.type == FETCH_GAMES_BY_DATE) {
    let key = gamesByDateKey(
      action.meta.year,
      action.meta.div,
      action.meta.date
    );
    return Object.assign({}, state, {
      [key]: handleFetch(state[key], action)
    });
  }
  return state;
}

export default gamesByDate;
