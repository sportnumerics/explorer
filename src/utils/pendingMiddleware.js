function isPromise(val) {
  return val && typeof val.then === 'function';
}

function pendingAction({type, meta}) {
  return {
    type,
    meta,
    pending: true
  }
}

export default function pendingMiddleware({dispatch}) {
  return next => action => {
    if (isPromise(action) || action && isPromise(action.payload)) {
      dispatch(pendingAction(action));
    }
    return next(action);
  }
}
