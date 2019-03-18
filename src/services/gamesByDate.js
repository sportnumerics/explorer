import fetch from 'isomorphic-fetch';
import config from 'config';
import { validateResponse, addMetadata } from './utils';

export default function gamesByDate(year, div, date) {
  const baseUrl = `${config.apiUrl}/years/${year}/divs/${div}/games`;

  const url = date === 'index' ? baseUrl : `${baseUrl}/${date}`;

  return fetch(url)
    .then(validateResponse)
    .then(addMetadata);
}
