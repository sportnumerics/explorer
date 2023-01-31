import { FETCH_TEAMS, teamsKey } from '../actions/fetchTeams';
import handleFetch from '../utils/handleFetch';

function sortByOverallRating(a,b) {
  if (a.ratings && b.ratings) {
    const diff = b.ratings.overall - a.ratings.overall;
    if (diff === 0) {
      return sortByName(a,b);
    }
    return diff;
  } else if (a.ratings) {
    return -1;
  } else if (b.ratings) {
    return 1;
  } else {
    return sortByName(a, b);
  }
}

function sortByName(a,b) {
  return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
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
