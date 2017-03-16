import fetch from 'isomorphic-fetch';
import config from 'config';

export default function teams(year, div) {
  let url = `${config.apiUrl}/years/${year}/divs/${div}/teams`;

  return fetch(url)
    .then(response => response.json());
}
