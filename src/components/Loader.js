import React from 'react'
import ErrorMessage from './ErrorMessage'
import 'font-awesome/css/font-awesome.css'

const ERROR_MESSAGE = 'Something went wrong retrieving some data.'

const Loader = ({fetching, error, children}) => {
  if (fetching) {
    return <div className='spinner-container'><i className='spinner fa fa-circle-o-notch fa-spin fa-5x'></i></div>;
  } else if (error) {
    return <ErrorMessage message={ ERROR_MESSAGE } />
  } else {
    return <div>{children}</div>;
  }
}

export default Loader;
