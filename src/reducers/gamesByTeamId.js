import { FETCH_GAMES } from '../actions/fetchGames';
import FETCH_STATUS from '../actions/fetchStatus';

const initialState = {
  isFetching: false,
  items: []
}

function games(state = initialState, action) {
  if (action.type == FETCH_GAMES) {
    switch(action.status) {
      case FETCH_STATUS.FETCHING:
        return Object.assign({}, state, {
          isFetching: true,
          error: null
        });
      case FETCH_STATUS.SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.games,
          error: null
        });
      case FETCH_STATUS.ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          error: action.error
        });
    }
  }
  return state;
}

function gamesByTeamId(state = {}, action) {
  if (action.type == FETCH_GAMES) {
    return Object.assign({}, state, {
      [action.teamId]: games(state[action.teamId], action)
    });
  }
  return state;
}

export default gamesByTeamId
