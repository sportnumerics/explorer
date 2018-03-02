import React from 'react'
import { Jumbotron } from 'react-bootstrap'

const ErrorMessage = ({message, action}) => <Jumbotron>
  <h1>That&rsquo;s an error</h1>
  <p>{message}</p>
  <p className="text-center">{ action }</p>
</Jumbotron>;

export default ErrorMessage
