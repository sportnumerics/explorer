import React from 'react'
import GameDate from './GameDate'
import GameResult from './GameResult'
import { round } from '../utils/utils'

const GameList = ({games}) => {
  return (
    <table>
    <thead>
      <tr><th>Date</th><th>Opponent</th><th>Result</th><th>Prediction</th><th>Error</th></tr>
    </thead>
    <tbody>
      {games.map((game, index) => {
        let llsError = Math.abs(game.result.pointsFor-game.predictions.llsGoalsFor) + Math.abs(game.result.pointsAgainst-game.predictions.llsGoalsAgainst);
        return (
        <tr key={index}>
          <td><GameDate iso8601dateString={game.date} /></td>
          <td>{game.opponent.name}</td>
          <td><GameResult pointsFor={game.result.pointsFor} pointsAgainst={game.result.pointsAgainst} /></td>
          <td><GameResult pointsFor={game.predictions.llsGoalsFor} pointsAgainst={game.predictions.llsGoalsAgainst} /></td>
          <td>{round(llsError, 2)}</td>
        </tr>
      )})}
    </tbody>
    </table>
  );
}

export default GameList
