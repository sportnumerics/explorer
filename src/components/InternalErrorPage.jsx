import React from 'react'
import { Button } from 'react-bootstrap'
import ErrorMessage from './ErrorMessage'

const MESSAGE = 'Sorry, something is broken.';

const ACTION = <Button bsStyle="primary" href="/">Take me home</Button>

const InternalErrorPage = () => <ErrorMessage message={ MESSAGE } action={ ACTION } />

export default InternalErrorPage
