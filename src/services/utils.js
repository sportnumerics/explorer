import moment from 'moment';

export function validateResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.message);
    error.statusCode = response.status;
    throw error;
  }
}

export function addMetadata(response) {
  let meta = {
    lastModified: moment(response.headers.get('Last-Modified')).toISOString()
  };
  return response.json()
    .then(json => Object.assign({}, json, { meta }));
}
