import React from 'react';

const TeamRank = ({ team }) =>
  team.rank < 25 ? <span className="team-rank">{team.rank}</span> : null;

export default TeamRank;