import React from 'react';
import StockTimeline from '../components/StockTimeline';

const Homepage = ({currentUser, stocks}) => {
  if (!currentUser) {
    return <div style={{textAlign: 'center'}}>Please login</div>;
  }
  return (
    <StockTimeline
      username={currentUser.username}
      stocks={stocks}
    />
  );
};

export default Homepage;
