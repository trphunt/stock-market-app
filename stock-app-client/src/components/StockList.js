import React from 'react';
import StockItem from './StockItem';

const StockList = ({stocks}) => {
  let stockList = stocks.map(s => (
    <StockItem
      key={s.id}
      date={s.createdAt}
      username={s.username}
      symbol={s.symbol}
    />
  ));
  return (
    <div className="col-sm-8">
      <ul className="list-group">
        {stockList}
      </ul>
    </div>
  );
};

StockList.defaultProps = {
  stocks: []
};

export default StockList;
