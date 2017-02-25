import fetch from 'isomorphic-fetch';
import config from 'config';

export default function teams(div) {
  let url = `${config.apiUrl}/divs/${div}/teams`;

  return fetch(url)
    .then(response => response.json())
    .then(json => json.teams);
}
