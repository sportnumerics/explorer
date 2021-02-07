import { MenuItem, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import YEARS, { DEFAULT_YEAR } from '../services/years'

import { DEFAULT_DIV } from '../services/divs'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'
import { connect } from 'react-redux'
import { fetchDivsIfNecessary } from '../actions/fetchDivs';

const YearMenuItem = ({currentDiv, toYear, onSelect}) => (
  <LinkContainer to={`/${toYear}/divs/${currentDiv}`} onSelect={onSelect}><MenuItem>{toYear}</MenuItem></LinkContainer>
)

const DivLink = ({currentYear, toDiv, onSelect}) => (
  <LinkContainer to={`/${currentYear}/divs/${toDiv.id}`} onSelect={onSelect}><MenuItem>{toDiv.title}</MenuItem></LinkContainer>
)

class Navigation extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchDivsIfNecessary(DEFAULT_YEAR));
  }

  render() {
    const {params, years, divs} = this.props
    const currentDiv = params.div || DEFAULT_DIV;
    const currentYearId = params.year || DEFAULT_YEAR;
    const currentYear = years.find(year => year.id === currentYearId)
    console.log('currentYear', currentYear);
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
          { years
              .filter(year => !year.unavailable?.includes(currentDiv))
              .map((year, i) => <YearMenuItem key={i} currentDiv={ currentDiv } toYear={year.id} />) }
        </NavDropdown>
        <NavDropdown title='Divisions' id='basic-nav-dropdown'>
          { divs && divs
              .filter(div => !currentYear?.unavailable?.includes(div.id))
              .map((div, i) => <DivLink key={i} currentYear={ currentYearId } toDiv={div} />) }
        </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
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

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
