
let handleFetch = (state = {}, action) => {
  if (action.pending) {
    return Object.assign({}, state, {
      isFetching: true,
      error: null
    })
  } else if (action.error) {
    return Object.assign({}, state, {
      isFetching: false,
      error: action.payload
    });
  } else {
    return Object.assign({}, state, {
      isFetching: false,
      result: action.payload,
      error: null
    });
  }
}

export default handleFetch;
