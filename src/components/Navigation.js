import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const divs = [
  {
    'id': '1',
    'name': 'NCAA Div 1'
  },
  {
    'id': '2',
    'name': 'NCAA Div 2'
  },
  {
    'id': '3',
    'name': 'NCAA Div 3'
  }
];

const years = [
  {
    id: '2017'
  },
  {
    id: '2016'
  }
];

const YearMenuItem = ({currentDiv, toYear, onSelect}) => (
  <LinkContainer to={`/${toYear}/divs/${currentDiv}`} onSelect={onSelect}><MenuItem>{toYear}</MenuItem></LinkContainer>
)

const DivLink = ({currentYear, toDiv, onSelect}) => (
  <LinkContainer to={`/${currentYear}/divs/${toDiv.id}`} onSelect={onSelect}><NavItem>{toDiv.name}</NavItem></LinkContainer>
)

const Navigation = ({params}) => {
  return (
    <Navbar inverse fixedTop collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          S#
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav>
      <NavDropdown title='Years' id='basic-nav-dropdown'>
        { years.map((year, i) => <YearMenuItem key={i} currentDiv={params.div} toYear={year.id} />) }
      </NavDropdown>
      { divs.map((div, i) => <DivLink key={i} currentYear={params.year} toDiv={div} />) }
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
