import React from 'react'

function normalize(points) {
  return Math.max(Math.round(points), 0);
}

function winOrLoss(pointsFor, pointsAgainst) {
  return pointsFor > pointsAgainst ? 'W' : 'L';
}

const GameResult = ({unimportant, pointsFor, pointsAgainst}) => (
  <span className={unimportant ? 'unimportant' : ''}>{normalize(pointsFor)}-{normalize(pointsAgainst)} {winOrLoss(pointsFor, pointsAgainst)}</span>
);

export default GameResult
