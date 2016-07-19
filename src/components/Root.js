require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../stores/configureStore'
import App from './App'
import { fetchTeams } from '../actions/fetchTeams';

const store = configureStore();

store.dispatch(fetchTeams());

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

Root.defaultProps = {
};

export default Root;
