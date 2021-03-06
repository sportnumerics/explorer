import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Nav, NavItem } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { PageHeader, Col, Grid, Row } from 'react-bootstrap';

import fetchDivs from '../actions/fetchDivs';
import Teams from './Teams';
import Loader from './Loader';
import GamesByDivision from './GamesByDivision';

class Division extends React.Component {
  componentDidMount() {
    this.props.fetchDivs(this.props.year);
  }

  componentDidUpdate(prevProps) {
    if (this.props.year !== prevProps.year) {
      this.props.fetchDivs(this.props.year);
    }
  }

  render() {
    const { error, isFetching, year, div } = this.props;
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3} xs={12}>
            <Loader fetching={isFetching} error={error}>
              <PageHeader>
                {div && div.title} <small>({year})</small>
              </PageHeader>
              <Nav
                bsStyle="tabs"
                activeKey={
                  this.props.location.pathname.includes('games')
                    ? 'games'
                    : 'teams'
                }
              >
                <NavItem eventKey="teams">
                  <LinkContainer
                    to={`/${this.props.year}/divs/${this.props.div.id}`}
                  >
                    <div>Teams</div>
                  </LinkContainer>
                </NavItem>
                <NavItem eventKey="games">
                  <LinkContainer
                    to={`/${this.props.year}/divs/${this.props.div.id}/games`}
                  >
                    <div>Games</div>
                  </LinkContainer>
                </NavItem>
              </Nav>
              <Switch>
                <Route
                  path={`/${this.props.year}/divs/${this.props.div.id}`}
                  exact
                >
                  <Teams year={year} div={div} />
                </Route>
                <Route
                  path={`/${this.props.year}/divs/${this.props.div.id}/games`}
                  render={({location, history}) => (
                    <GamesByDivision
                      year={this.props.year}
                      div={this.props.div.id}
                      location={location}
                      history={history}
                    />
                  )}
                />
              </Switch>
            </Loader>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const year = match.params.year;
  const divId = match.params.div;

  const asyncDivs = state.divsByYear[year] || {
    isFetching: true,
    result: {}
  };

  const div = _.find(asyncDivs.result, { id: divId }) || { id: divId };

  return {
    isFetching: asyncDivs.isFetching,
    error: asyncDivs.error,
    year,
    div,
    match
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDivs: year => dispatch(fetchDivs(year))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Division);
