import fetch from 'isomorphic-fetch';
import config from 'config';
import { validateResponse, addMetadata } from './utils';

export default function gamesByTeamId(year, teamId) {
  let url = `${config.apiUrl}/years/${year}/teams/${teamId}`;

  return fetch(url)
    .then(validateResponse)
    .then(addMetadata)
}
