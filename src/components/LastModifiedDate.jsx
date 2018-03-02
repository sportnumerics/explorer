import React from 'react'
import moment from 'moment'

const LastModifiedDate = ({iso8601dateString}) => {
  let date = moment(iso8601dateString);
  let dateString = date.fromNow();
  return <div className="last-modified-date"><small>Last updated {dateString}</small></div>
}

export default LastModifiedDate
