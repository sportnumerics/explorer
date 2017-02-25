import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import pendingMiddleware from './utils/pendingMiddleware'
import rootReducer from './reducers/root'

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      pendingMiddleware,
      promiseMiddleware,
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
