require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './App'
import Teams from './Teams'
import Team from './Team'
import { fetchTeamsIfNecessary } from '../actions/fetchTeams'
import { fetchGamesForTeamId } from '../actions/fetchGames'

const store = configureStore();

const fetchTeams = () => {
  store.dispatch(fetchTeamsIfNecessary());
}

const fetchGames = (id) => {
  store.dispatch(fetchGamesForTeamId(id))
}

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Teams} onEnter={() => fetchTeams()}/>

          <Route path="/teams/:teamId" component={Team} onEnter={(nextState)=>fetchGames(nextState.params.teamId)}/>
        </Route>
      </Router>
    </Provider>
  );
}

Root.defaultProps = {
};

export default Root;
