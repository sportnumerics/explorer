import React from 'react'
import GameDate from './GameDate'
import GameResult from './GameResult'
import { Link } from 'react-router-dom'
import { round } from '../utils/utils'
import { Table } from 'react-bootstrap'
import moment from 'moment';

const TeamGameList = ({ games, year }) => {
  return (
    <Table>
      <thead>
        <tr><th>Date</th><th>Opponent</th><th>Result</th><th>Prediction</th><th>Error</th></tr>
      </thead>
      <tbody>
        {games.map((game, index) => {
          return (
            <tr key={index}>
              <td><GameDate iso8601dateString={game.date} /></td>
              <td>{ !game.opponent.nonDivisional ? (<Link to={`/${year}/teams/${game.opponent.id}`}>{game.opponent.name}</Link>) : game.opponent.name }</td>
              <td>{game.result && (<GameResult pointsFor={game.result.pointsFor} pointsAgainst={game.result.pointsAgainst} />) }</td>
              <td>{game.predictions && (<GameResult prediction unimportant={moment(game.date).isAfter} pointsFor={game.predictions.llsGoalsFor} pointsAgainst={game.predictions.llsGoalsAgainst} />) }</td>
              <td><GameError game={game}/></td>
            </tr>
        )})}
      </tbody>
    </Table>
  );
}

const GameError = ({game}) => {
  if (game.result && game.predictions) {
    const llsError = game.result.pointsFor - game.predictions.llsGoalsFor - game.result.pointsAgainst + game.predictions.llsGoalsAgainst;
    if (llsError >= 0) {
      return <span className="positive-error">{ round(llsError, 2) }</span>
    } else {
      return <span className="negative-error">{ round(llsError, 2) }</span>
    }
  } else {
    return null;
  }
}

export default TeamGameList
