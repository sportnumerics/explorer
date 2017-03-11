import React from 'react'
import Navigation from './Navigation'
import { Grid, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

const App = ({children}) => {
  return (
    <Grid>
      <Row><Navigation /></Row>
      <Row><Col md={6} mdOffset={3} xs={12}>{children}</Col></Row>
    </Grid>
  );
};

export default App
