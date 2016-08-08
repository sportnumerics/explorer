import React from 'react'

const GameDate = ({iso8601dateString}) => {
  let date = new Date(iso8601dateString);
  let dateString = `${date.getMonth()+1}/${date.getDate()+1}`
  return <span>{dateString}</span>
}

export default GameDate
