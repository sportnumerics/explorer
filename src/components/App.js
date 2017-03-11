import React from 'react'
import Navigation from './Navigation'
import { Grid, Row, Col } from 'react-bootstrap'

const App = ({children, params}) => {
  return (
    <Grid>
      <Row><Navigation params={params}/></Row>
      <Row><Col md={6} mdOffset={3} xs={12}>{children}</Col></Row>
    </Grid>
  );
};

export default App
