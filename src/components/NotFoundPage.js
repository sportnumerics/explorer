import React from 'react'
import { Button } from 'react-bootstrap'
import ErrorMessage from './ErrorMessage'

const NOT_FOUND_MESSAGE = 'Sorry, you\'ve found a page that doesn\'t exist.';

const ACTION = <Button bsStyle="primary" href="/">Take me home</Button>

const NotFoundPage = () => <ErrorMessage message={ NOT_FOUND_MESSAGE } action={ ACTION } />

export default NotFoundPage
