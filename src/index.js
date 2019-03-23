import 'core-js/fn/object/assign';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import history from './services/history';
import ReactGA from 'react-ga';
import config from 'config';

ReactGA.initialize(config.gaTrackingId, config.gaOptions);

history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

// Render the main component into the dom
ReactDOM.render(<Root />, document.getElementById('app'));
