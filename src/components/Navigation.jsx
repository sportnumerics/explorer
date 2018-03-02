import React from 'react'
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { DEFAULT_DIV } from '../services/divs'
import YEARS, { DEFAULT_YEAR } from '../services/years'
import { Link } from 'react-router-dom'

const YearMenuItem = ({currentDiv, toYear, onSelect}) => (
  <LinkContainer to={`/${toYear}/divs/${currentDiv}`} onSelect={onSelect}><MenuItem>{toYear}</MenuItem></LinkContainer>
)

const DivLink = ({currentYear, toDiv, onSelect}) => (
  <LinkContainer to={`/${currentYear}/divs/${toDiv.id}`} onSelect={onSelect}><MenuItem>{toDiv.title}</MenuItem></LinkContainer>
)

const Navigation = ({params, years, divs}) => {
  return (
    <Navbar inverse fixedTop collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">S#</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav>
      <NavDropdown title='Years' id='basic-nav-dropdown'>
        { years.map((year, i) => <YearMenuItem key={i} currentDiv={ params.div || DEFAULT_DIV } toYear={year.id} />) }
      </NavDropdown>
      <NavDropdown title='Divisions' id='basic-nav-dropdown'>
        { divs && divs.map((div, i) => <DivLink key={i} currentYear={params.year || DEFAULT_YEAR } toDiv={div} />) }
      </NavDropdown>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state, { match }) => {
  const params = match.params;

  const divs = state.divsByYear[params.year || DEFAULT_YEAR] || {
    isFetching: true
  };

  return {
    params: params,
    years: YEARS,
    divs: divs.result
  };
};

export default connect(mapStateToProps)(Navigation);
