import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Chart from '../components/chart';

class StockList extends Component {
  renderStock(stockData) {
    const metaData = stockData['Meta Data'];
    const symbol = metaData['2. Symbol'];
    const timeSeries = stockData['Time Series (15min)'];
    const prices = _.values(timeSeries).map(time => Number(time["4. close"]));
    const volumes = _.values(timeSeries).map(time => Number(time["5. volume"]));

    
    return (
      <tr key={symbol}>
        <td className="symbol">{symbol}</td>
        <td><Chart data={prices} color="orange" units="$" /></td>
        <td><Chart data={volumes} color="blue" /></td>
        <td></td>
      </tr>
    );
  }
  
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Undefined</th>
          </tr>
        </thead>
        <tbody>
          {this.props.stock.map(this.renderStock)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ stock }) {
  return { stock };
}

export default connect(mapStateToProps)(StockList);


