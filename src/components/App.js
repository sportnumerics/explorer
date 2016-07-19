import React from 'react';
import { connect } from 'react-redux'
import TeamList from './TeamList';

const App = ({isFetching, error, items, sortBy}) => {
  if (isFetching) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <TeamList teams={items} sortBy={sortBy}/>
  }
};

const mapStateToProps = (state) => {
  const { teams } = state;
  const { isFetching, error, items, sortBy } = teams;

  return {
    isFetching,
    error,
    items,
    sortBy
  };
};

export default connect(mapStateToProps)(App);
