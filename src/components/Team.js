import React from 'react';
import { connect } from 'react-redux'
import GameList from './GameList'
import Loader from './Loader'
import { gamesKey } from '../actions/fetchGames';

const Team = ({isFetching, error, result, year, div}) => (
  <Loader fetching={isFetching} error={error}>
    <GameList games={result} year={year} div={div}/>
  </Loader>
);

const mapStateToProps = (state, ownProps) => {
  const year = ownProps.params.year;
  const div = ownProps.params.div;
  const teamId = ownProps.params.teamId;

  const { isFetching, error, result } = state.gamesByTeamId[gamesKey(year, teamId)] || {
    isFetching: true,
    result: []
  };

  return {
    isFetching,
    error,
    result,
    year,
    div
  };
};

export default connect(mapStateToProps)(Team);
