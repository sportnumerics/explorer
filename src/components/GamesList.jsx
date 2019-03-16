import React from 'react'
import GameDate from './GameDate'
import GameResult from './GameResult'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const GamesList = ({ games, year }) => {
  return (
    <Table>
      <thead>
        <tr><th>Date</th><th>Home</th><th>Away</th><th>Result</th><th>Prediction</th></tr>
      </thead>
      <tbody>
        {games.map((game, index) => {
          return (
            <tr key={index}>
              <td><GameDate iso8601dateString={game.date} /></td>
              <td><Link to={`/${year}/teams/${game.team.id}`}>{ game.team.name }</Link></td>
              <td>{ !game.opponent.nonDivisional ? (<Link to={`/${year}/teams/${game.opponent.id}`}>{game.opponent.name}</Link>) : game.opponent.name }</td>
              <td>{game.result && (<GameResult pointsFor={game.result.pointsFor} pointsAgainst={game.result.pointsAgainst} />) }</td>
              <td>{game.predictions && (<GameResult unimportant={game.result} pointsFor={game.predictions.llsGoalsFor} pointsAgainst={game.predictions.llsGoalsAgainst} />) }</td>
            </tr>
        )})}
      </tbody>
    </Table>
  );
}

export default GamesList
