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

const YearMenuItem = ({currentDiv, toYear}) => (
  <LinkContainer to={`/${toYear}/divs/${currentDiv}`}><MenuItem>{toYear}</MenuItem></LinkContainer>
)

const DivLink = ({currentYear, toDiv}) => (
  <LinkContainer to={`/${currentYear}/divs/${toDiv.id}`}><NavItem>{toDiv.name}</NavItem></LinkContainer>
)

const Navigation = ({params}) => {
  return (
    <Navbar inverse fixedTop>
      <Navbar.Header>
          <Navbar.Brand>
            S#
          </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavDropdown title='Years' id='years-dropdown'>
          { years.map(year => <YearMenuItem key={year.id} currentDiv={params.div} toYear={year.id} />) }
        </NavDropdown>
        { divs.map(div => <DivLink key={div.id} currentYear={params.year} toDiv={div} />) }
      </Nav>
    </Navbar>
  );
}

export default Navigation;
