import React from 'react';

const TeamList = ({sortBy, teams}) => {
  return (
    <table>
      <thead>
        <tr><th /><th>Team</th><th>Rating</th></tr>
      </thead>
      <tbody>
        {teams.sort(sortBy).map((team, index) => {
          return <tr key={team.id}><td>{index+1}</td><td>{team.name}</td><td>{team.ratings.overall}</td></tr>
        })}
      </tbody>
    </table>
  );
};

TeamList.defaultProps = {
  teams: React.PropTypes.object.isRequired
};

export default TeamList;
