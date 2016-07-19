import { FETCH_TEAMS, FETCH_STATUS } from '../actions/fetchTeams';

function sortByOverallRating(a,b) {
  return b.ratings.overall - a.ratings.overall;
}

const initialState = {
  isFetching: false,
  items: [],
  sortBy: sortByOverallRating
};

function teams(state = initialState, action) {
  if (action.type == FETCH_TEAMS) {
    switch(action.status) {
      case FETCH_STATUS.FETCHING:
        return Object.assign({}, state, {
          isFetching: true,
          error: null
        });
      case FETCH_STATUS.SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.teams,
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

export default teams
