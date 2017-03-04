import React from 'react'
import GameDate from './GameDate'
import GameResult from './GameResult'
import { Link } from 'react-router'
import { round } from '../utils/utils'

const GameList = ({games, year, div}) => {
  return (
    <table>
    <thead>
      <tr><th>Date</th><th>Opponent</th><th>Result</th><th>Prediction</th><th>Error</th></tr>
    </thead>
    <tbody>
      {games.map((game, index) => {
        let llsError;
        if (game.result) {
          llsError = Math.abs(game.result.pointsFor-game.predictions.llsGoalsFor) + Math.abs(game.result.pointsAgainst-game.predictions.llsGoalsAgainst);
        }
        return (
        <tr key={index}>
          <td><GameDate iso8601dateString={game.date} /></td>
          <td><Link to={`/${year}/divs/${div}/teams/${game.opponent.id}`}>{game.opponent.name}</Link></td>
          <td>{game.result ? (<GameResult pointsFor={game.result.pointsFor} pointsAgainst={game.result.pointsAgainst} />) : "" }</td>
          <td><GameResult pointsFor={game.predictions.llsGoalsFor} pointsAgainst={game.predictions.llsGoalsAgainst} /></td>
          <td>{llsError ? round(llsError, 2) : ""}</td>
        </tr>
      )})}
    </tbody>
    </table>
  );
}

export default GameList
