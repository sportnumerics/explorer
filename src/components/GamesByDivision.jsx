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
    const {
      year,
      div,
      index,
      gamesByDate,
      fetchGamesByDate,
      location
    } = this.props;

    const fromDate = this.fromDateFromLocation(location) || index.defaultDate();

    return (
      <Loader fetching={index.isFetching} error={index.error}>
        <div className="games-by-division">
          {index.areThereGamesBefore(fromDate) && (
            <Button onClick={this.loadPrevious}>Previous day</Button>
          )}
          {index.gamesAfterDate(fromDate).map(({ count, date }) => {
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
          })}
        </div>
      </Loader>
    );
  }

  loadPrevious() {
    const { history, index, location } = this.props;

    const fromDate = this.fromDateFromLocation(location) || index.defaultDate();

    const newFromDate = index.previousDateWithGames(fromDate);

    const params = new URLSearchParams(location.search);
    params.set(FROM_DATE_URL_KEY, newFromDate.format('YYYY-MM-DD'));

    const newLocation = {
      ...location,
      search: `?${params.toString()}`
    };

    history.replace(newLocation);
  }

  fromDateFromLocation(location) {
    const params = new URLSearchParams(location.search);
    return params.has(FROM_DATE_URL_KEY)
      && moment(params.get(FROM_DATE_URL_KEY));
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
        <GamesList
          fetching={fetching}
          date={date}
          year={year}
          games={gamesList}
        />
      </Observer>
    );
  }
}

class GamesIndex {
  constructor(index) {
    this.isFetching = index.isFetching;
    this.error = index.error;
    this.games = (index.result && index.result.games) || {};
  }

  defaultDate() {
    if (this.areThereGamesAfter(moment())) {
      return moment();
    } else {
      return _.first(this.sortedGameDates());
    }
  }

  gamesAfterDate(date) {
    if (!this.games) {
      return [];
    }

    return _(this.games)
      .map((count, date) => ({ count, date }))
      .filter(({ date: d }) => moment(d).diff(date, 'days') >= 0)
      .sortBy('date')
      .value();
  }

  previousDateWithGames(date) {
    if (!this.games) {
      return null;
    }

    return moment(
      _(this.games)
        .map((count, date) => ({ count, date }))
        .filter(({ date: d }) => moment(d).diff(date, 'days') < 0)
        .sortBy('date')
        .last().date
    );
  }

  areThereGamesBefore(date) {
    if (!this.games || !date) {
      return false;
    }

    const dates = this.sortedGameDates();

    return moment(date).diff(_.first(dates), 'days') > 0;
  }

  areThereGamesAfter(date) {
    if (!this.games || !date) {
      return false;
    }

    const dates = this.sortedGameDates();

    return moment(_.last(dates)).diff(date, 'days') > 0;
  }

  sortedGameDates() {
    return _(this.games)
      .keys()
      .sortBy()
      .value();
  }
}

const mapStateToProps = (state, { year, div }) => {
  const index = new GamesIndex(
    state.gamesByDate[gamesByDateKey(year, div, 'index')] || {
      isFetching: true
    }
  );
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
