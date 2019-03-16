import fetch from 'isomorphic-fetch';
import config from 'config';
import { validateResponse, addMetadata } from './utils';

export default function gamesByDate(year, div, date) {
  let url = `${config.apiUrl}/years/${year}/divs/${div}/games/${date}`;

  return fetch(url)
    .then(validateResponse)
    .then(addMetadata);
}
