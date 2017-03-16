import React from 'react'
import moment from 'moment'

const GameDate = ({iso8601dateString}) => {
  let date = moment(iso8601dateString);
  let dateString = date.format('M/D');
  return <span>{dateString}</span>
}

export default GameDate
