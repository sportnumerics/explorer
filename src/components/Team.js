import React from 'react';
import { connect } from 'react-redux'
import GameList from './GameList'
import Loader from './Loader'
import { gamesKey } from '../actions/fetchGames';
import { PageHeader, Well, Col, Grid, Row } from 'react-bootstrap';
import LastModifiedDate from './LastModifiedDate';

const GamesListOrEmptyView = ({ schedule, year, div }) => {
  if (schedule && schedule.length > 0) {
    return <GameList games={ schedule } year={year} div={div}/>;
  } else {
    return <Well>This team has no games (that we know about)</Well>;
  }
}

const Team = ({isFetching, error, team}) => (
  <Grid>
    <Row>
      <Col md={6} mdOffset={3} xs={12}>
        <Loader fetching={isFetching} error={error}>
          <PageHeader>{ team && team.name } <small>({ team && team.season})</small></PageHeader>
          <GamesListOrEmptyView schedule={ team && team.schedule } year={ team && team.season } div={ team && team.div } />
          <LastModifiedDate iso8601dateString={ team && team.meta.lastModified } />
        </Loader>
      </Col>
    </Row>
  </Grid>
);

const mapStateToProps = (state, ownProps) => {
  const year = ownProps.params.year;
  const teamId = ownProps.params.teamId;

  const asyncTeam = state.gamesByTeamId[gamesKey(year, teamId)] || {
    isFetching: true
  };

  return {
    isFetching: asyncTeam.isFetching,
    error: asyncTeam.error,
    team: asyncTeam.result
  };
};

export default connect(mapStateToProps)(Team);
