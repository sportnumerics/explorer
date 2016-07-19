import React from 'react'

const GameList = ({games}) => {
  return (
    <table>
    <thead>
      <tr><th>Opponent</th><th>Result</th><th>Prediction</th></tr>
    </thead>
    <tbody>
      {games.map((game) => (
        <tr>
          <td>{game.opponent.name}</td>
          <td>{game.result.pointsFor}-{game.result.pointsAgainst}</td>
          <td>{game.predictions.llsGoalsFor}-{game.predictions.llsGoalsAgainst}</td>
        </tr>
      ))}
    </tbody>
    </table>
  );
}

export default GameList
