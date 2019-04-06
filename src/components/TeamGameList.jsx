import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import GameDate from './GameDate';
import GameResult from './GameResult';
import { round } from '../utils/utils';
import TeamRank from './TeamRank';

const TeamGameList = ({ games, year }) => {
  return (
    <div className="sn-table team-game-list">
      <div className="header sn-row">
        <div className="date">Date</div>
        <div className="opponent">Opponent</div>
        <div className="score">Score</div>
        <div className="error">Error</div>
      </div>
      {games.map((game, index) => {
        return (
          <div key={`game-row-${index}`} className="sn-row">
            <div className="date">
              <GameDate iso8601dateString={game.date} />
            </div>
            <div className="opponent">
              {!game.opponent.nonDivisional
                ? [
                    <GameLocation key="location" location={game.location} />,
                    <TeamRank key="rank" team={game.opponent} />,
                    <Link key="link" to={`/${year}/teams/${game.opponent.id}`}>
                      {game.opponent.name}
                    </Link>
                  ]
                : game.opponent.name}
            </div>
            <div className="score">
              {game.result ? (
                <GameResult
                  pointsFor={game.result.pointsFor}
                  pointsAgainst={game.result.pointsAgainst}
                />
              ) : (
                game.predictions && (
                  <GameResult
                    prediction
                    unimportant={moment(game.date).isAfter}
                    pointsFor={game.predictions.llsGoalsFor}
                    pointsAgainst={game.predictions.llsGoalsAgainst}
                  />
                )
              )}
            </div>
            <div className="error">
              <GameError game={game} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const GameLocation = ({location}) => {
  if (location.type !== 'home') {
    return <span className="at">at</span>;
  } else {
    return null;
  }
}

const GameError = ({ game }) => {
  if (game.result && game.predictions) {
    const llsError =
      game.result.pointsFor -
      game.predictions.llsGoalsFor -
      game.result.pointsAgainst +
      game.predictions.llsGoalsAgainst;
    if (llsError >= 0) {
      return <span className="positive-error">{round(llsError, 2)}</span>;
    } else {
      return <span className="negative-error">{round(llsError, 2)}</span>;
    }
  } else {
    return null;
  }
};

export default TeamGameList;
