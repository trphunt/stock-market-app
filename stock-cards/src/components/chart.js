import React from 'react';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

function average(data) {
  return _.round(_.sum(data)/data.length, 2);
}

export default (props) => {
  return (
      <div>
        <Sparklines height={60} width={90} data={props.data}>
          <SparklinesLine color={props.color} />
          <SparklinesReferenceLine type="avg" />
        </Sparklines>
      <div>{props.units} {average(props.data)}</div>
      </div>
  );
};