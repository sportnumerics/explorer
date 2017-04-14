import 'normalize.css/normalize.css'
import 'styles/App.scss'

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { Router, Route, IndexRedirect, browserHistory, IndexRoute } from 'react-router'
import App from './App'
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

const fetchTeams = doOrDie(({params}) => {
  let year = params.year;
  let div = params.div;

  store.dispatch(fetchDivsIfNecessary(year));
  store.dispatch(fetchTeamsIfNecessary(year,div));
});

const fetchGames = doOrDie(({params}) => {
  let year = params.year;
  let div = params.div;
  let id = params.teamId;

  store.dispatch(fetchTeamsIfNecessary(year,div));
  store.dispatch(fetchGamesByTeamId(year,div,id));
});

const fetchDivs = doOrDie(({params}) => {
  let year = params.year || DEFAULT_YEAR;

  store.dispatch(fetchDivsIfNecessary(year));
});

const Root = () => {
  return (
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ App } onEnter={ fetchDivs }>
          <IndexRoute component={ Landing } />

          <Route path="404" component={ NotFoundPage } />
          <Route path="500" component={ InternalErrorPage } />
          <Route path=":year" onEnter={ fetchDivs } >
            <IndexRedirect to="divs/1" />

            <Route path="divs/:div" component={ Teams } onEnter={ fetchTeams }/>
            <Route path="divs/:div/teams/:teamId" component={ Team } onEnter={ fetchGames }/>

            <Route path="*" component={ NotFoundPage } />
          </Route>
        </Route>
      </Router>
    </Provider>
  );
}

Root.defaultProps = {
};

export default Root;
