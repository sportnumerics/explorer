require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import App from './App'
import Teams from './Teams'
import Team from './Team'
import { fetchTeamsIfNecessary } from '../actions/fetchTeams'
import fetchGamesByTeamId from '../actions/fetchGames'

const store = configureStore();

const fetchTeams = (div) => {
  store.dispatch(fetchTeamsIfNecessary(div));
}

const fetchGames = (div,id) => {
  store.dispatch(fetchGamesByTeamId(div,id))
}

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          // <IndexRoute component={Teams} onEnter={() => fetchTeams(1)}/>
          <IndexRedirect to="/divs/1" />

          <Route path="/divs/:div" component={Teams} onEnter={(nextState)=>fetchTeams(nextState.params.div)}/>
          <Route path="/divs/:div/teams/:teamId" component={Team} onEnter={(nextState)=>fetchGames(nextState.params.div, nextState.params.teamId)}/>
        </Route>
      </Router>
    </Provider>
  );
}

Root.defaultProps = {
};

export default Root;
