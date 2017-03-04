import fetch from 'isomorphic-fetch';
import config from 'config';

export default function gamesByTeamId(year, div, teamId) {
  let url = `${config.apiUrl}/years/${year}/divs/${div}/teams/${teamId}/schedule`;

  return fetch(url)
    .then(response => response.json())
    .then(json => json.schedule)
}
