import React from 'react';
import moment from 'moment';
import GameResult from './GameResult';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

class GamesList extends React.Component {
  render() {
    const { year, date, games } = this.props;
    return (
      <Table>
        <GamesListHeader formattedDate={moment(date).format('ddd MMM D')} />
        <GamesListBody year={year} games={games} date={date} />
      </Table>
    );
  }
}

const GamesListHeader = ({ formattedDate }) => (
  <thead>
    <tr>
      <th colSpan="4">{formattedDate}</th>
    </tr>
    <tr>
      <th>Home</th>
      <th>Away</th>
      <th>Result</th>
      <th>Prediction</th>
    </tr>
  </thead>
);

const GamesListBody = ({ year, games, date }) => (
  <tbody>
    {games.map((game, index) => {
      return (
        <tr key={index}>
          <td>
            {game.team && (
              <Link to={`/${year}/teams/${game.team.id}`}>
                {game.team.name}
              </Link>
            )}
          </td>
          <td>
            {game.opponent &&
              (!game.opponent.nonDivisional ? (
                <Link to={`/${year}/teams/${game.opponent.id}`}>
                  {game.opponent.name}
                </Link>
              ) : (
                <span>{game.opponent.name}</span>
              ))}
          </td>
          <td>
            {game.result && (
              <GameResult
                pointsFor={game.result.pointsFor}
                pointsAgainst={game.result.pointsAgainst}
              />
            )}
          </td>
          <td>
            {game.predictions && (
              <GameResult
                unimportant={moment().isAfter(moment(date))}
                pointsFor={game.predictions.llsGoalsFor}
                pointsAgainst={game.predictions.llsGoalsAgainst}
              />
            )}
          </td>
        </tr>
      );
    })}
  </tbody>
);

export default GamesList;
