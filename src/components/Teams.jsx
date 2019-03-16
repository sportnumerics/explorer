import React from 'react';
import { connect } from 'react-redux'
import TeamList from './TeamList';
import Loader from './Loader';
import fetchTeams, { teamsKey } from '../actions/fetchTeams';
import LastModifiedDate from './LastModifiedDate';

class Teams extends React.Component {
  componentDidMount() {
    this.props.fetchTeams(this.props.year, this.props.div.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.year !== prevProps.year || this.props.div.id !== prevProps.div.id) {
      this.props.fetchTeams(this.props.year, this.props.div.id);
    }
  }

  render() {
    const {isFetching, error, result, sortBy, year, div} = this.props;
    return (
      <Loader fetching={isFetching} error={error}>
        <TeamList teams={result && result.teams} sortBy={sortBy} year={year} div={div.id}/>
        <LastModifiedDate iso8601dateString={result && result.meta.lastModified} />
      </Loader>
    );
  }
}

const mapStateToProps = (state, { year, div }) => {
  const asyncTeams = state.teamsByDiv[teamsKey(year, div.id)] || {
    isFetching: true
  };

  const sortBy = state.teamsByDiv.sortBy;

  return {
    isFetching: asyncTeams.isFetching,
    error: asyncTeams.error,
    result: asyncTeams.result,
    sortBy,
    year,
    div
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeams: (year, div) => dispatch(fetchTeams(year, div))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
