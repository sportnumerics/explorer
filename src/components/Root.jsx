import 'normalize.css/normalize.css'
import 'styles/App.scss'

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../services/history'
import Navigation from './Navigation';
import Footer from './Footer'
import Division from './Division'
import Team from './Team'
import NotFoundPage from './NotFoundPage'
import InternalErrorPage from './InternalErrorPage'
import Landing from './Landing'
import Status from './Status'

const store = configureStore();

const Root = () => {
  return (
      <Provider store={ store }>
        <Router history={ history } >
          <div>
            <Switch>
              <Route path="/:year/divs/:div" component={ Navigation } />
              <Route component={ Navigation }/>
            </Switch>
            <Switch>
              <Route exact path="/" component={ Landing } />
              <Route path="/status" component={ Status } />
              <Route path="/:year/divs/:div" component={ Division } />
              <Route path="/:year/teams/:teamId" component={ Team } />

              <Route path="404" component={ NotFoundPage } />
              <Route path="500" component={ InternalErrorPage } />
              <Route component={ NotFoundPage } />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
  );
}

Root.defaultProps = {
};

export default Root;
