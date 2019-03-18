import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Observer from '@researchgate/react-intersection-observer';

import fetchGamesByDateIfNecessary, { gamesByDateKey } from '../actions/fetchGamesByDate';
import GamesList from './GamesList';
import Loader from './Loader';

class GamesByDivision extends React.Component {
  componentDidMount() {
    const { year, div, fetchGamesByDate } = this.props;

    fetchGamesByDate(year, div, 'index');
  }

  render() {
    const { year, div, index, gamesByDate, fetchGamesByDate } = this.props;

    console.log('Index: ', index);

    return (
      <Loader fetching={index.isFetching} error={index.error}>
        {_(index.result && index.result.games)
          .map((count, date) => ({ count, date }))
          .sortBy('date')
          .map(({ count, date }) => {
            return (
              <GamesByDate
                key={date}
                year={year}
                div={div}
                date={date}
                count={count}
                games={gamesByDate[gamesByDateKey(year, div, date)]}
                fetchGamesByDate={fetchGamesByDate}
              />
            );
          })
          .value()}
      </Loader>
    );
  }
}

class GamesByDate extends React.Component {
  handleChange({ isIntersecting }) {
    if (isIntersecting) {
      const { year, div, date, fetchGamesByDate } = this.props;

      console.log(`Fetching ${year}  ${div} ${date}`);
      fetchGamesByDate(year, div, date);
    }
  }

  render() {
    const { year, date, games, count } = this.props;

    const gamesList =
      games && games.result ? games.result.games : new Array(count).fill({});

    return (
      <Observer onChange={this.handleChange.bind(this)}>
        <GamesList date={date} year={year} games={gamesList} />
      </Observer>
    );
  }
}

const mapStateToProps = (state, { year, div }) => {
  const index = state.gamesByDate[gamesByDateKey(year, div, 'index')] || {
    isFetching: true
  };
  const gamesByDate = state.gamesByDate;

  return {
    index,
    year,
    div,
    gamesByDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGamesByDate: (year, div, date) =>
      dispatch(fetchGamesByDateIfNecessary(year, div, date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesByDivision);
