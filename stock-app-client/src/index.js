import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StockApp from './containers/StockApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <StockApp />,
  document.getElementById('root')
  );
registerServiceWorker();
