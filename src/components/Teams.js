import React from 'react';
import { connect } from 'react-redux'
import TeamList from './TeamList';
import Loader from './Loader';
import { teamsKey } from '../actions/fetchTeams';
import _ from 'lodash';
import { PageHeader } from 'react-bootstrap';

const Teams = ({isFetching, error, teams, sortBy, year, div}) => {
  return (<Loader fetching={isFetching} error={error}>
    <PageHeader>{div && div.title} <small>({year})</small></PageHeader>
    <TeamList teams={teams} sortBy={sortBy} year={year} div={div.id}/>
  </Loader>)
};

const mapStateToProps = (state, ownProps) => {
  const year = ownProps.params.year;
  const divId = ownProps.params.div;

  const asyncTeams = state.teamsByDiv[teamsKey(year, divId)] || {
    isFetching: true
  };

  const asyncDivs = state.divsByYear[year] || {
    isFetching: true,
    result: []
  }

  const sortBy = state.teamsByDiv.sortBy;

  const div = _.find(asyncDivs.result, {id: divId}) || { id: divId };

  return {
    isFetching: asyncTeams.isFetching || asyncDivs.isFetching,
    error: asyncTeams.error || asyncDivs.error,
    teams: asyncTeams.result,
    sortBy,
    year,
    div
  };
};

export default connect(mapStateToProps)(Teams);
