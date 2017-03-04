import React from 'react';
import { connect } from 'react-redux'
import TeamList from './TeamList';
import Loader from './Loader';
import { teamsKey } from '../actions/fetchTeams';

const Teams = ({isFetching, error, result, sortBy, year, div}) => {
  return (<Loader fetching={isFetching} error={error}>
    <TeamList teams={result} sortBy={sortBy} year={year} div={div}/>
  </Loader>)
};

const mapStateToProps = (state, ownProps) => {
  const year = ownProps.params.year;
  const div = ownProps.params.div;

  const { isFetching, error, result } = state.teamsByDiv[teamsKey(year, div)] || {
    isFetching: true
  };

  const sortBy = state.teamsByDiv.sortBy;

  return {
    isFetching,
    error,
    result,
    sortBy,
    year,
    div
  };
};

export default connect(mapStateToProps)(Teams);
