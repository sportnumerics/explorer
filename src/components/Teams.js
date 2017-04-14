import React from 'react';
import { connect } from 'react-redux'
import TeamList from './TeamList';
import Loader from './Loader';
import { teamsKey } from '../actions/fetchTeams';
import _ from 'lodash';
import { PageHeader, Col, Grid, Row } from 'react-bootstrap';
import LastModifiedDate from './LastModifiedDate';

const Teams = ({isFetching, error, result, sortBy, year, div}) => {
  return <Grid><Row>
    <Col md={6} mdOffset={3} xs={12}>
      <Loader fetching={isFetching} error={error}>
        <PageHeader>{div && div.title} <small>({year})</small></PageHeader>
        <TeamList teams={result && result.teams} sortBy={sortBy} year={year} div={div.id}/>
        <LastModifiedDate iso8601dateString={result && result.meta.lastModified} />
      </Loader>
    </Col>
  </Row></Grid>
};

const mapStateToProps = (state, ownProps) => {
  const year = ownProps.params.year;
  const divId = ownProps.params.div;

  const asyncTeams = state.teamsByDiv[teamsKey(year, divId)] || {
    isFetching: true
  };

  const asyncDivs = state.divsByYear[year] || {
    isFetching: true,
    result: {}
  }

  const sortBy = state.teamsByDiv.sortBy;

  const div = _.find(asyncDivs.result, {id: divId}) || { id: divId };

  return {
    isFetching: asyncTeams.isFetching || asyncDivs.isFetching,
    error: asyncTeams.error || asyncDivs.error,
    result: asyncTeams.result,
    sortBy,
    year,
    div
  };
};

export default connect(mapStateToProps)(Teams);
