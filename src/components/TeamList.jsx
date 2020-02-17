import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { round } from '../utils/utils';

const TeamList = ({ sortBy, teams, year }) => {
  return (
    <div className="team-list sn-table">
      <div className="header sn-row">
        <div className="rank" />
        <div className="team">Team</div>
        <div className="rating">Rating</div>
      </div>
      {teams.sort(sortBy).map((team) => {
        return (
          <div key={team.id} className="sn-row">
            <div className="rank">{team.rank}</div>
            <div className="team">
              <Link to={`/${year}/teams/${team.id}`}>{team.name}</Link>
              {team.record && (
                <span className="record">
                  ({team.record.wins}-{team.record.losses})
                </span>
              )}
            </div>
            <div className="rating">{team.ratings && round(team.ratings.overall, 2)}</div>
          </div>
        );
      })}
    </div>
  );
};

TeamList.defaultProps = {
  teams: PropTypes.object.isRequired
};

export default TeamList;
