import config from 'config'
import fetch from 'isomorphic-fetch'
import { validateResponse } from './utils';

export const DEFAULT_DIV = 'm1';

export default function divs(year) {
  let url = `${config.apiUrl}/years/${year}`;

  return fetch(url)
    .then(validateResponse)
    .then(response => response.json())
    .then(json => json.divisions);
}
