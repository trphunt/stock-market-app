import React from 'react';
import StockList from './StockList';
import UserAside from './UserAside';

const StockTimeline = ({username, stocks}) => (
  <div className="row">
    <UserAside
       username={username}
    />
    <StockList stocks={stocks} />
  </div>
);

export default StockTimeline;
