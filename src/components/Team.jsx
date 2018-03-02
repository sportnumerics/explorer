import React from 'react';
import { connect } from 'react-redux'
import GameList from './GameList'
import Loader from './Loader'
import { gamesKey } from '../actions/fetchGames';
import { PageHeader, Well, Col, Grid, Row } from 'react-bootstrap';
import LastModifiedDate from './LastModifiedDate';
import fetchGamesByTeamId from '../actions/fetchGames'

const GamesListOrEmptyView = ({ schedule, year, div }) => {
  if (schedule && schedule.length > 0) {
    return <GameList games={ schedule } year={year} div={div}/>;
  } else {
    return <Well>This team has no games (that we know about)</Well>;
  }
}

class Team extends React.Component {
  constructor(props) {
    super(props)
    const { year, teamId, dispatch } = props;
    dispatch(fetchGamesByTeamId(year, teamId));
  }

  render() {
    const {isFetching, error, team} = this.props;
    return <Grid>
      <Row>
        <Col md={6} mdOffset={3} xs={12}>
          <Loader fetching={isFetching} error={error}>
            <PageHeader>{ team && team.name } <small>({ team && team.year})</small></PageHeader>
            <GamesListOrEmptyView schedule={ team && team.schedule } year={ team && team.year } div={ team && team.div } />
            <LastModifiedDate iso8601dateString={ team && team.meta.lastModified } />
          </Loader>
        </Col>
      </Row>
    </Grid>
  }
}

const mapStateToProps = (state, {match}) => {
  const year = match.params.year;
  const teamId = match.params.teamId;

  const asyncTeam = state.gamesByTeamId[gamesKey(year, teamId)] || {
    isFetching: true
  };

  return {
    isFetching: asyncTeam.isFetching,
    error: asyncTeam.error,
    team: asyncTeam.result,
    year,
    teamId
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
