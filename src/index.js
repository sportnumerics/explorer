import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { browserHistory } from 'react-router';
import ReactGA from 'react-ga';
import config from 'config';

ReactGA.initialize(config.gaTrackingId, config.gaOptions);

browserHistory.listen( location =>  {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

// Render the main component into the dom
ReactDOM.render(<Root />, document.getElementById('app'));
