import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Navigation = () => {
  return (
    <Navbar inverse fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          sportnumerics
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem href="/2017/divs/1">Division 1</NavItem>
        <NavItem href="/2017/divs/2">Division 2</NavItem>
        <NavItem href="/2017/divs/3">Division 3</NavItem>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
