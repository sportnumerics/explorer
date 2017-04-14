import React from 'react'
import Navigation from './Navigation'

const App = ({children, params}) => {
  return (
    <div>
      <Navigation params={params} />
      {children}
      <div className="footer">
        <div className="container">
          <p className="align-middle"><a href="https://twitter.com/wiggzz"><i className="fa fa-twitter fa-2x" aria-hidden="true"></i></a></p>
        </div>
      </div>
    </div>
  );
};

export default App
