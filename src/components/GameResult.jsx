import React from 'react'

function normalize(points) {
  return Math.max(Math.round(points), 0);
}

function winOrLoss(pointsFor, pointsAgainst) {
  return pointsFor > pointsAgainst ? 'W' : 'L';
}

const GameResult = ({unimportant, pointsFor, pointsAgainst, prediction}) => {
  const classes = [unimportant ? 'unimportant' : '', prediction ? 'prediction' : ''].join(' ');
  return <span className={classes}>{normalize(pointsFor)}-{normalize(pointsAgainst)} {winOrLoss(pointsFor, pointsAgainst)}</span>
};

export default GameResult
