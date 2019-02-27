import React from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import './StockItem.css';
import DefaultProfileImg from '../images/green-dollar-sign.jpg';

const StockItem = (props) => {
  const {username, symbol, date} = props;
  return (
    <li className="list-group-item stock-container">
      <Link to="/">
        <img
          src={DefaultProfileImg}
          alt={`${username} profile`}
          className="timeline-image"
        />
      </Link>
      <div className="stock-area">
        <Link to="/">@{username}</Link>
        <Moment className="text-muted" format="Do MMM YYYY">{date}</Moment>
        <p>{symbol}</p>
        <button className="btn-delete">DELETE</button>
      </div>
    </li>
  );
};

export default StockItem;