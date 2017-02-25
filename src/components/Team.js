import React from 'react';
import { connect } from 'react-redux'
import GameList from './GameList'
import Loader from './Loader'

const Team = ({isFetching, error, result, div}) => (
  <Loader fetching={isFetching} error={error}>
    <GameList games={result} div={div}/>
  </Loader>
);

const mapStateToProps = (state, ownProps) => {
  const div = ownProps.params.div;
  const teamId = ownProps.params.teamId;

  const { isFetching, error, result } = state.gamesByTeamId[teamId] || {
    isFetching: true,
    result: []
  };

  return {
    isFetching,
    error,
    result,
    div
  };
};

export default connect(mapStateToProps)(Team);
