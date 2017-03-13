require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import App from './App'
import Teams from './Teams'
import Team from './Team'
import { fetchTeamsIfNecessary } from '../actions/fetchTeams'
import fetchGamesByTeamId from '../actions/fetchGames'
import { fetchDivsIfNecessary } from '../actions/fetchDivs'

const store = configureStore();

const fetchTeams = (year, div) => {
  store.dispatch(fetchDivsIfNecessary(year));
  store.dispatch(fetchTeamsIfNecessary(year,div));
}

const fetchGames = (year,div,id) => {
  store.dispatch(fetchTeamsIfNecessary(year,div));
  store.dispatch(fetchGamesByTeamId(year,div,id));
}

const fetchDivs = (year) => {
  store.dispatch(fetchDivsIfNecessary(year));
}

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} >
          <Route path="/:year" onEnter={(nextState) => fetchDivs(nextState.params.year)} >
            <IndexRedirect to="divs/1" />

            <Route path="divs/:div" component={Teams} onEnter={(nextState)=>fetchTeams(nextState.params.year, nextState.params.div)}/>
            <Route path="divs/:div/teams/:teamId" component={Team} onEnter={(nextState)=>fetchGames(nextState.params.year, nextState.params.div, nextState.params.teamId)}/>
          </Route>
        </Route>
      </Router>
    </Provider>
  );
}

Root.defaultProps = {
};

export default Root;
