import fetch from 'isomorphic-fetch'
import config from 'config'
import YEARS from './years'
import _ from 'lodash'

function validate(year) {
  return !!_.find(YEARS, {id:year});
}

export default function teams(year) {
  if (!validate(year)) {
    throw new Error('Year not found.');
  }

  let url = `${config.apiUrl}/years/${year}/divs`;

  return fetch(url)
    .then(response => response.json())
    .then(json => json.divisions);
}
