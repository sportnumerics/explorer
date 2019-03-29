import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Observer from '@researchgate/react-intersection-observer';
import moment from 'moment';

import {
  fetchGamesByDateIfNecessary,
  gamesByDateKey
} from '../actions/fetchGamesByDate';
import GamesList from './GamesList';
import Loader from './Loader';

const FROM_DATE_URL_KEY = 'from';

class GamesByDivision extends React.Component {
  constructor(props) {
    super(props);

    this.loadPrevious = this.loadPrevious.bind(this);
  }

  componentDidMount() {
    const { year, div, fetchGamesByDate } = this.props;

    fetchGamesByDate(year, div, 'index');
  }

  render() {
    const { year, div, index, gamesByDate, fetchGamesByDate, location } = this.props;

    const fromDate = this.fromDateFromLocation(location);

    return (
      <Loader fetching={index.isFetching} error={index.error}>
        <div className="games-by-division">
          <Button onClick={this.loadPrevious}>Previous day</Button>
          {_(index.result && index.result.games)
            .map((count, date) => ({ count, date }))
            .filter(({ date }) =>
              moment(date).diff(fromDate, 'days') >= 0
            )
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
    const { history, index, location } = this.props;

    const fromDate = this.fromDateFromLocation(location);

    const newFromDate = this.priorDateWithGames(index, fromDate);

    const params = new URLSearchParams(location.search);
    params.set(FROM_DATE_URL_KEY, newFromDate.format('YYYY-MM-DD'));

    const newLocation = {
      ...location,
      search: `?${params.toString()}`
    }

    history.replace(newLocation);
  }

  priorDateWithGames(index, fromDate) {
    const {
      result: { games }
    } = index;
    return moment(
      _(games)
        .map((count, date) => ({ count, date }))
        .filter(({ date }) => moment(date).diff(fromDate, 'days') < 0)
        .sortBy('date')
        .last().date
    );
  }

  fromDateFromLocation(location) {
    const params = new URLSearchParams(location.search);
    return params.has(FROM_DATE_URL_KEY) ? moment(params.get(FROM_DATE_URL_KEY)) : moment();
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

    const fetching = games && games.isFetching;
    const gamesList =
      games && games.result
        ? games.result.games
        : Array(count).fill({ placeholder: true });

    return (
      <Observer key="observer" onChange={this.handleChange.bind(this)}>
        <GamesList fetching={fetching} date={date} year={year} games={gamesList} />
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
