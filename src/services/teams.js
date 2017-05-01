import fetch from 'isomorphic-fetch';
import config from 'config';
import { validateResponse, addMetadata } from './utils';

export default function teams(year, div) {
  let url = `${config.apiUrl}/years/${year}/divs/${div}/teams`;

  return fetch(url)
    .then(validateResponse)
    .then(addMetadata);
}
