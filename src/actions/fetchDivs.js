import { createAction } from 'redux-actions';
import divs from '../services/divs';

export const FETCH_DIVS = 'FETCH_DIVS';

function metaCreator(year) {
  return {year};
}

let fetchDivs = createAction(FETCH_DIVS, divs, metaCreator);

function shouldFetchDivs(state, year) {
  return !state.divsByYear[year];
}

export function fetchDivsIfNecessary(year) {
  return (dispatch, getState) => {
    if (shouldFetchDivs(getState(), year)) {
      dispatch(fetchDivs(year));
    }
  };
}

export default fetchDivs
