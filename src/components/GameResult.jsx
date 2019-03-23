import React from 'react';

function normalize(points) {
  return Math.max(Math.round(points), 0);
}

function winOrLoss(pointsFor, pointsAgainst) {
  return pointsFor > pointsAgainst ? 'W' : 'L';
}

const GameResult = ({
  pointsFor,
  pointsAgainst,
  prediction,
  showWinLoss = true
}) => {
  return (
    <div className="result-container">
      <div className={prediction ? 'prediction' : 'final'}>
        {normalize(pointsFor)}-{normalize(pointsAgainst)}{' '}
        {showWinLoss && winOrLoss(pointsFor, pointsAgainst)}
      </div>
      {prediction && <div className="projection-annotation">(projected)</div>}
    </div>
  );
};

export default GameResult;
