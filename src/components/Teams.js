import React from 'react';
import { connect } from 'react-redux'
import TeamList from './TeamList';
import Loader from './Loader';

const Teams = ({isFetching, error, items, sortBy}) => {
  return (<Loader fetching={isFetching} error={error}>
    <TeamList teams={items} sortBy={sortBy}/>
  </Loader>)
};

const mapStateToProps = (state) => {
  const { isFetching, error, items, sortBy } = state.teams;

  return {
    isFetching,
    error,
    items,
    sortBy
  };
};

export default connect(mapStateToProps)(Teams);
