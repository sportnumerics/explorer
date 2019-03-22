import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Observer from '@researchgate/react-intersection-observer';
import moment from 'moment'

import {
  fetchGamesByDateIfNecessary,
  gamesByDateKey
} from '../actions/fetchGamesByDate';
import GamesList from './GamesList';
import Loader from './Loader';

class GamesByDivision extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fromDate: moment()
    };

    this.loadPrevious = this.loadPrevious.bind(this);
  }

  componentDidMount() {
    const { year, div, fetchGamesByDate } = this.props;

    fetchGamesByDate(year, div, 'index');
  }

  render() {
    const { year, div, index, gamesByDate, fetchGamesByDate } = this.props;

    return (
      <Loader fetching={index.isFetching} error={index.error}>
        <div className="games-by-division">
          <Button onClick={this.loadPrevious}>Previous day</Button>
          {_(index.result && index.result.games)
            .map((count, date) => ({ count, date }))
            .filter(({date}) => moment(date).isSameOrAfter(this.state.fromDate))
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
        </div>
      </Loader>
    );
  }

  loadPrevious() {
    this.setState((state, props) => {
      const { fromDate } = state;
      const { index } = props;
      return { fromDate: this.priorDateWithGames(index, fromDate) };
    });
  }

  priorDateWithGames(index, fromDate) {
    const { result: { games }} = index;
    return moment(_(games)
      .map((count, date) => ({ count, date }))
      .filter(({date}) => moment(date).isBefore(fromDate))
      .sortBy('date')
      .last().date);
  }
}

class GamesByDate extends React.Component {
  handleChange({ isIntersecting }) {
    if (isIntersecting) {
      const { year, div, date, fetchGamesByDate } = this.props;

      fetchGamesByDate(year, div, date);
    }
  }

  render() {
    const { year, date, games, count } = this.props;

    const gamesList =
      games && games.result
        ? games.result.games
        : new Array(count).fill({ placeholder: true });

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
