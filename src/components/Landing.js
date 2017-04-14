import React from 'react'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from 'responsive-loader?sizes[]=352,sizes[]=704,sizes[]=1056!../images/logo.png'

const Logo = () => <div className="main-logo-container">
  <img srcSet={logo.srcSet} src={logo.src} sizes="(max-width: 45em) 65vw, 25vw" />
</div>

const Welcome = () =>  <p className="lead">
Welcome to the new <strong>sportnumerics</strong>. We&#8217;re
providing computer ratings for NCAA lacrosse divisions 1, 2 and 3 at the moment,
with MCLA coming soon.</p>

const DivisionalLink = ({div}) => <LinkContainer to={`/2017/divs/${div}`}>
  <Button bsStyle="primary">
    <span className="glyphicon glyphicon-th-list" aria-hidden="true" /> NCAA Division {div}
  </Button>
</LinkContainer>

const Landing = () => (
  <Grid><Row><Col xs={12} md={8} mdOffset={2}>
    <div className="text-center">
      <Logo />
      <Welcome />
      <p><DivisionalLink div={1} /></p>
      <p><DivisionalLink div={2} /></p>
      <p><DivisionalLink div={3} /></p>
    </div>
  </Col></Row></Grid>
)

export default Landing;
