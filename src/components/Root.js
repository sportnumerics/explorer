import 'normalize.css/normalize.css'
import 'styles/App.scss'

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
import NotFoundPage from './NotFoundPage'

const store = configureStore();

const doOrDie = (f) => (state, replace) => {
  try {
    f(state);
  } catch (error) {
    replace({pathname:'/404'});
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
  let year = params.year;

  store.dispatch(fetchDivsIfNecessary(year));
});

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} >
          <IndexRedirect to="2017" />

            <Route path="404" component={ NotFoundPage } />
          <Route path=":year" onEnter={fetchDivs} >
            <IndexRedirect to="divs/1" />

            <Route path="divs/:div" component={Teams} onEnter={fetchTeams}/>
            <Route path="divs/:div/teams/:teamId" component={Team} onEnter={fetchGames}/>
          </Route>
        </Route>
      </Router>
    </Provider>
  );
}

Root.defaultProps = {
};

export default Root;
