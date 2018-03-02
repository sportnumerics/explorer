import 'normalize.css/normalize.css'
import 'styles/App.scss'

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../services/history'
import Navigation from './Navigation';
import Footer from './Footer'
import Teams from './Teams'
import Team from './Team'
import { fetchTeamsIfNecessary } from '../actions/fetchTeams'
import fetchGamesByTeamId from '../actions/fetchGames'
import { fetchDivsIfNecessary } from '../actions/fetchDivs'
import NotFoundPage from './NotFoundPage'
import InternalErrorPage from './InternalErrorPage'
import Landing from './Landing'
import { DEFAULT_YEAR } from '../services/years'

const store = configureStore();

const doOrDie = (f) => (state, replace) => {
  try {
    f(state);
  } catch (error) {
    if (error.statusCode === 404) {
      replace({pathname:'/404'});
    } else {
      replace({pathname:'/500'});
    }
  }
}

const fetchTeams = doOrDie(({match}) => {
  let year = match.params.year;
  let div = match.params.div;

  store.dispatch(fetchDivsIfNecessary(year));
  store.dispatch(fetchTeamsIfNecessary(year,div));
});

const fetchGames = doOrDie(({match}) => {
  let year = match.params.year;
  let id = match.params.teamId;

  store.dispatch(fetchGamesByTeamId(year,id));
});

const fetchDivs = doOrDie(({match}) => {
  let year = match.params.year || DEFAULT_YEAR;

  store.dispatch(fetchDivsIfNecessary(year));
});

const Root = () => {
  return (
    <Provider store={ store }>
      <Router history={ history } >
        <div>
          <Route component={ Navigation } />
          <Route onEnter={ fetchDivs } />
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/:year" onEnter={ fetchDivs } />
            <Route path="/:year/divs/:div" component={ Teams } onEnter={ fetchTeams } />
            <Route path="/:year/teams/:teamId" component={ Team } onEnter={ fetchGames } />

            <Route path="404" component={ NotFoundPage } />
            <Route path="500" component={ InternalErrorPage } />
            <Route component={ NotFoundPage } />
          </Switch>
          <Route component={ Footer } />
        </div>
      </Router>
    </Provider>
  );
}

Root.defaultProps = {
};

export default Root;
