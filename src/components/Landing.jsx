import React from 'react'
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from 'responsive-loader?sizes[]=352,sizes[]=704,sizes[]=1056!../images/logo.png'
import { DEFAULT_YEAR } from '../services/years';

const Logo = () => <div className="main-logo-container">
  <img srcSet={logo.srcSet} src={logo.src} sizes="(max-width: 768px) 65vw, 25vw" />
</div>

const Welcome = () =>  <p className="lead">
Welcome to the new <strong>sportnumerics</strong>. We&#8217;re
providing computer ratings for NCAA and MCLA lacrosse.</p>

const ButtonLink = ({to, children}) => <LinkContainer to={to}>
  <ListGroupItem>
    <span className="glyphicon glyphicon-th-list" aria-hidden="true" /> {children}
  </ListGroupItem>
</LinkContainer>

const Landing = () => (
  <Grid><Row>
    <Col xs={12} sm={8} smOffset={2} className="text-center">
        <Logo />
        <Welcome />
    </Col>
    <Col xs={12} sm={6} smOffset={3} lg={4} lgOffset={4} className="text-center">
      <h4>NCAA Men's Lacrosse</h4>
      <ListGroup>
        <ButtonLink to={`/${DEFAULT_YEAR}/divs/m1`}>Division 1</ButtonLink>
        <ButtonLink to={`/${DEFAULT_YEAR}/divs/m2`}>Division 2</ButtonLink>
        <ButtonLink to={`/${DEFAULT_YEAR}/divs/m3`}>Division 3</ButtonLink>
      </ListGroup>
      <h4>NCAA Women's Lacrosse</h4>
      <ListGroup>
        <ButtonLink to={`/${DEFAULT_YEAR}/divs/w1`}>Division 1</ButtonLink>
        <ButtonLink to={`/${DEFAULT_YEAR}/divs/w2`}>Division 2</ButtonLink>
        <ButtonLink to={`/${DEFAULT_YEAR}/divs/w3`}>Division 3</ButtonLink>
      </ListGroup>
      <h4>MCLA Lacrosse</h4>
      <ListGroup>
        <ButtonLink to={`/${DEFAULT_YEAR}/divs/mcla1`}>Division 1</ButtonLink>
        <ButtonLink to={`/${DEFAULT_YEAR}/divs/mcla2`}>Division 2</ButtonLink>
      </ListGroup>
    </Col>
  </Row></Grid>
)

export default Landing;
