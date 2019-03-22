import React from 'react';
import moment from 'moment';
import GameResult from './GameResult';
import { Link } from 'react-router-dom';

class GamesList extends React.Component {
  render() {
    const { year, date, games } = this.props;
    return [
      <div key={`${date}-date`} className="date gbd-row" id={date}>
        {moment(date).format('ddd MMM D')}
      </div>,
      <div key={`${date}-heaeder`} className="header gbd-row">
        <div className="team-name">Home</div>
        <div className="team-name">Away</div>
        <div className="result">Result</div>
        <div className="result">Predicted</div>
      </div>,
      games.map((game, index) =>
        game.placeholder ? (
          <div key={`${date}-game-${index}`} className="game gbd-row">
            <PlaceholderCell type="team-name" />
            <PlaceholderCell type="team-name" />
            <PlaceholderCell type="result" isEmpty={moment(date).isAfter()} />
            <PlaceholderCell type="result" />
          </div>
        ) : (
          <div key={`${date}-game-${index}`} className="game gbd-row">
            <div className="team-name">
              {game.team && <TeamName year={year} team={game.team} />}
            </div>
            <div className="team-name">
              {game.opponent && <TeamName year={year} team={game.opponent} />}
            </div>
            <div className="result">
              {game.result && (
                <GameResult
                  pointsFor={game.result.pointsFor}
                  pointsAgainst={game.result.pointsAgainst}
                />
              )}
            </div>
            <div className="result">
              {game.predictions && (
                <GameResult
                  prediction
                  unimportant={moment().isAfter(moment(date))}
                  pointsFor={game.predictions.llsGoalsFor}
                  pointsAgainst={game.predictions.llsGoalsAgainst}
                />
              )}
            </div>
          </div>
        )
      )
    ];
  }
}

const PlaceholderCell = ({ type, isEmpty }) => <div className={ `placeholder ${type} ${isEmpty && 'empty'}`} />;

const TeamName = ({ year, team }) => [
  <TeamRank key="rank" team={team} />,
  !team.nonDivisional ? (
    <Link key="name" to={`/${year}/teams/${team.id}`}>
      {team.name}
    </Link>
  ) : (
    <span key="name">{team.name}</span>
  )
];

const TeamRank = ({ team }) =>
  team.rank < 25 ? <span className="team-rank">{team.rank}</span> : null;

export default GamesList;
