
export function validateResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.message);
    error.statusCode = response.status;
    throw error;
  }
}
