import React from 'react';
import moment from 'moment';
import GameResult from './GameResult';
import { Link } from 'react-router-dom';
import LoadingBar from './LoadingBar';
import TeamRank from './TeamRank';

class GamesList extends React.Component {
  render() {
    const { fetching, year, date, games } = this.props;
    return [
      <div key={`${date}-date`} className="date gbd-row" id={date}>
        {moment(date).format('ddd MMM D')}
      </div>,
      fetching && <LoadingBar key="loader" />,
      <div key={`${date}-header`} className="header gbd-row">
        <div className="team-name">Away</div>
        <div className="team-name">Home</div>
        <div className="result">Score</div>
      </div>,
      games.map((game, index) =>
        game.placeholder ? (
          <PlaceholderRow
            key={`${date}-game-${index}`}
            index={index}
            date={date}
          />
        ) : (
          <GameRow
            key={`${date}-game-${index}`}
            year={year}
            date={date}
            game={game}
            index={index}
          />
        )
      )
    ];
  }
}

const PlaceholderRow = () => <div className="game gbd-row" />;

const GameRow = ({ year, date, game }) => {
  const ordered =
    game.location.type === 'home'
      ? {
          home: game.team,
          away: game.opponent,
          result: game.result && homeResult(game.result),
          predictions: game.predictions && homePredictions(game.predictions)
        }
      : {
          home: game.opponent,
          away: game.team,
          result: game.result && game.result,
          predictions: game.predictions && game.predictions
        };
  return (
    <div className="game gbd-row">
      <div className="team-name">
        <TeamName year={year} team={ordered.away} />
      </div>
      <div className="team-name">
        <TeamName year={year} team={ordered.home} />
      </div>
      <div className="result">
        {ordered.result ? (
          <GameResult
            pointsFor={ordered.result.pointsFor}
            pointsAgainst={ordered.result.pointsAgainst}
            showWinLoss={false}
          />
        ) : (
          ordered.predictions && (
            <GameResult
              prediction
              unimportant={moment(date).diff(moment(), 'days') < 0}
              pointsFor={ordered.predictions.llsGoalsFor}
              pointsAgainst={ordered.predictions.llsGoalsAgainst}
              showWinLoss={false}
            />
          )
        )}
      </div>
    </div>
  );
};

function homeResult({ pointsFor, pointsAgainst }) {
  return {
    pointsFor: pointsAgainst,
    pointsAgainst: pointsFor
  };
}

function homePredictions({ llsGoalsFor, llsGoalsAgainst }) {
  return {
    llsGoalsFor: llsGoalsAgainst,
    llsGoalsAgainst: llsGoalsFor
  };
}

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

export default GamesList;
