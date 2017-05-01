import fetch from 'isomorphic-fetch';
import config from 'config';
import { validateResponse, addMetadata } from './utils';

export default function gamesByTeamId(year, div, teamId) {
  let url = `${config.apiUrl}/years/${year}/divs/${div}/teams/${teamId}/schedule`;

  return fetch(url)
    .then(validateResponse)
    .then(addMetadata)
}
