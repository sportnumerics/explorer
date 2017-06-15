import React from 'react'
import { Link } from 'react-router'
import { round } from '../utils/utils'
import { Table } from 'react-bootstrap'

const TeamList = ({sortBy, teams, year}) => {
  return (
    <Table>
      <thead>
        <tr><th /><th>Team</th><th>Rating</th></tr>
      </thead>
      <tbody>
        {teams.sort(sortBy).map((team, index) => {
          return <tr key={team.id}><td>{index+1}</td><td><Link to={`/${year}/teams/${team.id}`}>{team.name}</Link></td><td>{team.ratings && round(team.ratings.overall,2)}</td></tr>
        })}
      </tbody>
    </Table>
  );
};

TeamList.defaultProps = {
  teams: React.PropTypes.object.isRequired
};

export default TeamList;
