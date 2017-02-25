import fetch from 'isomorphic-fetch';
import config from 'config';

export default function gamesByTeamId(div, teamId) {
  let url = `${config.apiUrl}/divs/${div}/teams/${teamId}/schedule`;

  return fetch(url)
    .then(response => response.json())
    .then(json => json.schedule)
}
