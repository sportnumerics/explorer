import React from 'react';

const TeamRank = ({ team, div }) =>
  team.rank < 25 && team.div === div ? <span className="team-rank">{team.rank}</span> : null;

export default TeamRank;
