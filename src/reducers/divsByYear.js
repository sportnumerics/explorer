import { FETCH_DIVS } from '../actions/fetchDivs'
import handleFetch from '../utils/handleFetch';

function divsByYear(state = {}, action) {
  if (action.type == FETCH_DIVS) {
    let key = action.meta.year;
    return Object.assign({}, state, {
      [key]: handleFetch(state[key], action)
    });
  }
  return state;
}

export default divsByYear
