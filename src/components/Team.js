import React from 'react';
import { connect } from 'react-redux'
import GameList from './GameList'
import Loader from './Loader'
import { gamesKey } from '../actions/fetchGames';
import { teamsKey } from '../actions/fetchTeams';
import _ from 'lodash';
import { PageHeader } from 'react-bootstrap';

const Team = ({isFetching, error, games, team, year, div}) => (
  <Loader fetching={isFetching} error={error}>
    <PageHeader>{team && team.name} <small>({year})</small></PageHeader>
    <GameList games={games} year={year} div={div}/>
  </Loader>
);

const mapStateToProps = (state, ownProps) => {
  const year = ownProps.params.year;
  const div = ownProps.params.div;
  const teamId = ownProps.params.teamId;

  const asyncGames = state.gamesByTeamId[gamesKey(year, teamId)] || {
    isFetching: true,
    result: []
  };

  const asyncTeams = state.teamsByDiv[teamsKey(year, div)] || {
    isFetching: true,
    result: []
  };

  const team = _.find(asyncTeams.result, { id: parseInt(teamId) });

  return {
    isFetching: asyncGames.isFetching || asyncTeams.isFetching,
    error: asyncGames.error || asyncTeams.error,
    games: asyncGames.result,
    team,
    year,
    div
  };
};

export default connect(mapStateToProps)(Team);
