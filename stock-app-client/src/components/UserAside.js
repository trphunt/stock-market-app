import React from 'react';
import './UserAside.css';
import DefaultProfileImg from '../images/green-dollar-sign.jpg';

const UserAside = ({
  username,
  stockCount
}) => (
  <aside className="col-sm-4" id="home-aside">
    <div className="panel panel-default">
      <div className="panel-body">
        <img src={DefaultProfileImg} alt={username} id="profile-img"/>
        <div className="row text-center">
        </div>
      </div>
    </div>
  </aside>
);

export default UserAside;
