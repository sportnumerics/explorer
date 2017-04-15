import React from 'react'
import ErrorPage from './ErrorPage'

const Loader = ({fetching, error, children}) => {
  if (fetching) {
    return <div className='spinner-container'><i className='spinner fa fa-circle-o-notch fa-spin fa-5x'></i></div>;
  } else if (error) {
    return <ErrorPage error={error} />
  } else {
    return <div>{children}</div>;
  }
}

export default Loader;
