import React from 'react';
import { connect } from 'react-redux'
import GameList from './GameList'
import Loader from './Loader'
import { gamesKey } from '../actions/fetchGames';
import { teamsKey } from '../actions/fetchTeams';
import _ from 'lodash';
import { PageHeader } from 'react-bootstrap';
import LastModifiedDate from './LastModifiedDate';

const Team = ({isFetching, error, result, team, year, div}) => (
  <Loader fetching={isFetching} error={error}>
    <PageHeader>{team && team.name} <small>({year})</small></PageHeader>
    <GameList games={result && result.schedule} year={year} div={div}/>
    <LastModifiedDate iso8601dateString={result && result.meta.lastModified} />
  </Loader>
);

const mapStateToProps = (state, ownProps) => {
  const year = ownProps.params.year;
  const div = ownProps.params.div;
  const teamId = ownProps.params.teamId;

  const asyncGames = state.gamesByTeamId[gamesKey(year, teamId)] || {
    isFetching: true,
    result: {}
  };

  const asyncTeams = state.teamsByDiv[teamsKey(year, div)] || {
    isFetching: true,
    result: {}
  };

  const team = _.find(asyncTeams.result.teams, { id: parseInt(teamId) });

  return {
    isFetching: asyncGames.isFetching || asyncTeams.isFetching,
    error: asyncGames.error || asyncTeams.error,
    result: asyncGames.result,
    team,
    year,
    div
  };
};

export default connect(mapStateToProps)(Team);
