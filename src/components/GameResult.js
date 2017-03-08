import React from 'react'

function normalize(points) {
  return Math.max(Math.round(points), 0);
}

const GameResult = ({pointsFor, pointsAgainst}) => <span>{normalize(pointsFor)}-{normalize(pointsAgainst)}</span>

export default GameResult
