import fetch from 'isomorphic-fetch'
import config from 'config'
import { validateResponse } from './utils';

export default function teams(year) {
  let url = `${config.apiUrl}/years/${year}/divs`;

  return fetch(url)
    .then(validateResponse)
    .then(response => response.json())
    .then(json => json.divisions);
}
