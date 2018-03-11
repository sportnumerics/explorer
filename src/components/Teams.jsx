import React from 'react';
import { connect } from 'react-redux'
import TeamList from './TeamList';
import Loader from './Loader';
import { teamsKey } from '../actions/fetchTeams';
import _ from 'lodash';
import { PageHeader, Col, Grid, Row } from 'react-bootstrap';
import LastModifiedDate from './LastModifiedDate';
import fetchTeams from '../actions/fetchTeams'
import fetchDivs from '../actions/fetchDivs'

class Teams extends React.Component {
  constructor(props) {
    super(props)

    props.fetchDivs(props.year);
    props.fetchTeams(props.year, props.div.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.year !== this.props.year) {
      this.props.fetchDivs(nextProps.year);
      this.props.fetchTeams(nextProps.year, nextProps.div.id);
    } else if (nextProps.div !== this.props.div) {
      this.props.fetchTeams(nextProps.year, nextProps.div.id);
    }
  }

  render() {
    const {isFetching, error, result, sortBy, year, div} = this.props;
    return (
      <Grid><Row>
        <Col md={6} mdOffset={3} xs={12}>
          <Loader fetching={isFetching} error={error}>
            <PageHeader>{div && div.title} <small>({year})</small></PageHeader>
            <TeamList teams={result && result.teams} sortBy={sortBy} year={year} div={div.id}/>
            <LastModifiedDate iso8601dateString={result && result.meta.lastModified} />
          </Loader>
        </Col>
      </Row></Grid>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const year = match.params.year;
  const divId = match.params.div;

  const asyncTeams = state.teamsByDiv[teamsKey(year, divId)] || {
    isFetching: true
  };

  const asyncDivs = state.divsByYear[year] || {
    isFetching: true,
    result: {}
  }

  const sortBy = state.teamsByDiv.sortBy;

  const div = _.find(asyncDivs.result, {id: divId}) || { id: divId };

  return {
    isFetching: asyncTeams.isFetching || asyncDivs.isFetching,
    error: asyncTeams.error || asyncDivs.error,
    result: asyncTeams.result,
    sortBy,
    year,
    div
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDivs: (year) => dispatch(fetchDivs(year)),
    fetchTeams: (year, div) => dispatch(fetchTeams(year, div))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
