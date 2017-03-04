import { FETCH_TEAMS, teamsKey } from '../actions/fetchTeams';
import handleFetch from '../utils/handleFetch';

function sortByOverallRating(a,b) {
  if (a.ratings && b.ratings) {
    return b.ratings.overall - a.ratings.overall;
  } else if (a.ratings) {
    return -1;
  } else {
    return 1;
  }
}

const initialState = {
  sortBy: sortByOverallRating
}

function teamsByDiv(state = initialState, action) {
  if (action.type == FETCH_TEAMS) {
    let key = teamsKey(action.meta.year, action.meta.div);
    return Object.assign({}, state, {
      [key]: handleFetch(state[key], action)
    });
  }
  return state
}

export default teamsByDiv
