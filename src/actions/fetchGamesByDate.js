import { createAction } from 'redux-actions';
import gamesByDate from '../services/gamesByDate';

export const FETCH_GAMES_BY_DATE = 'FETCH_GAMES_BY_DATE';

function metaCreator(year, div, date) {
  return { year, div, date };
}

let fetchGamesByDate = createAction(
  FETCH_GAMES_BY_DATE,
  gamesByDate,
  metaCreator
);

export default fetchGamesByDate;

function shouldFetchGames(state, year, div, date) {
  return !state.gamesByDate[gamesByDateKey(year, div, date)];
}

export function fetchGamesByDateIfNecessary(year, div, date) {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState(), year, div, date)) {
      return dispatch(fetchGamesByDate(year, div, date));
    }
  };
}

export function gamesByDateKey(year, div, date) {
  return `${year}_${div}_${date}`;
}
