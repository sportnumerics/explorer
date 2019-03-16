import React from 'react';
import { connect } from 'react-redux';
import fetchGamesByDate, { gamesByDateKey } from '../actions/fetchGamesByDate';
import GamesList from './GamesList';
import Loader from './Loader';

class GamesByDate extends React.Component {
  componentDidMount() {
    this.props.fetchGamesByDate(this.props.year, this.props.div, this.props.date);
  }

  render() {
    const {isFetching, error, result, year} = this.props;
    return (
      <Loader fetching={isFetching} error={error}>
        <GamesList games={result && result.games} year={year}/>
      </Loader>
    );
  }
}

const mapStateToProps = (state, { year, div, date }) => {
  const asyncGames = state.gamesByDate[gamesByDateKey(year, div, date)] || {
    isFetching: true
  };

  const sortBy = state.teamsByDiv.sortBy;

  return {
    isFetching: asyncGames.isFetching,
    error: asyncGames.error,
    result: asyncGames.result,
    sortBy,
    year,
    div
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGamesByDate: (year, div, date) => dispatch(fetchGamesByDate(year, div, date))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesByDate);

