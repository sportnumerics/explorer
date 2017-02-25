import React from 'react';
import 'font-awesome/css/font-awesome.css'

const Loader = ({fetching, error, children}) => {
  if (fetching) {
    return <div className='spinner-container'><i className='spinner fa fa-circle-o-notch fa-spin fa-5x'></i></div>;
  } else if (error) {
    return (<div>
      <div className='error-container'><i className='error fa fa-exclamation-triangle fa-2x'></i>Error: {error.message}</div>
    </div>);
  } else {
    return children;
  }
}

export default Loader;
