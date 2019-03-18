import React from 'react';
import moment from 'moment';
import GameResult from './GameResult';
import { Link } from 'react-router-dom';

class GamesList extends React.Component {
  render() {
    const { year, date, games } = this.props;
    return [
      <tr>
        <th className="date-row" colSpan="4">{moment(date).format('ddd MMM D')}</th>
      </tr>,
      <tr>
        <th>Home</th>
        <th>Away</th>
        <th>Result</th>
        <th>Prediction</th>
      </tr>,
      games.map((game, index) =>
        game.placeholder ? (
          <tr key={index}>
            <PlaceholderCell type="team-name" />
            <PlaceholderCell type="team-name" />
            <PlaceholderCell type="result" />
            <PlaceholderCell type="result" />
          </tr>
        ) : (
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
        )
      )
    ];
  }
}

const PlaceholderCell = ({ type }) => (
  <td>
    <div className={`placeholder ${type}`} />
  </td>
);

export default GamesList;
