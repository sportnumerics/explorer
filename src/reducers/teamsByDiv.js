import { FETCH_TEAMS } from '../actions/fetchTeams';
import handleFetch from '../utils/handleFetch';

function sortByOverallRating(a,b) {
  return b.ratings.overall - a.ratings.overall;
}

const initialState = {
  sortBy: sortByOverallRating
}

function teamsByDiv(state = initialState, action) {
  if (action.type == FETCH_TEAMS) {
    return Object.assign({}, state, {
      [action.meta.div]: handleFetch(state[action.meta.div], action)
    });
  }
  return state
}

export default teamsByDiv
