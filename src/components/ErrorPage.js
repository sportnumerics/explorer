import React from 'react'
import NotFoundPage from './NotFoundPage'
import InternalErrorPage from './InternalErrorPage'

const ErrorPage = ({error}) => {
  if (error.statusCode === 404) {
    return <NotFoundPage />
  } else {
    return <InternalErrorPage />
  }
}

export default ErrorPage
