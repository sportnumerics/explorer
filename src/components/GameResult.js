import React from 'react'

const GameResult = ({pointsFor, pointsAgainst}) => <span>{Math.round(pointsFor)}-{Math.round(pointsAgainst)}</span>

export default GameResult
