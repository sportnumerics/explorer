import React from 'react';
import { connect } from 'react-redux'
import GameList from './GameList'
import Loader from './Loader'

const Team = ({isFetching, error, items}) => (
  <Loader fetching={isFetching} error={error}>
    <GameList games={items} />
  </Loader>
);

const mapStateToProps = (state, ownProps) => {
  const teamId = ownProps.params.teamId;
  const { isFetching, error, items } = state.gamesByTeamId[teamId] || {
    isFetching: true,
    items: []
  };

  return {
    isFetching,
    error,
    items
  };
};

export default connect(mapStateToProps)(Team);
