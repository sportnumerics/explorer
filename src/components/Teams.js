import React from 'react';
import { connect } from 'react-redux'
import TeamList from './TeamList';
import Loader from './Loader';


const Teams = ({isFetching, error, result, sortBy, div}) => {
  return (<Loader fetching={isFetching} error={error}>
    <TeamList teams={result} sortBy={sortBy} div={div}/>
  </Loader>)
};

const mapStateToProps = (state, ownProps) => {
  const div = ownProps.params.div;

  const { isFetching, error, result } = state.teamsByDiv[div] || {
    isFetching: true
  };

  const sortBy = state.teamsByDiv.sortBy;

  return {
    isFetching,
    error,
    result,
    sortBy,
    div
  };
};

export default connect(mapStateToProps)(Teams);
