import fetch from 'isomorphic-fetch';
import config from 'config';

export default function teams(year) {
  let url = `${config.apiUrl}/years/${year}/divs`;

  return fetch(url)
    .then(response => response.json())
    .then(json => json.divisions);
}
