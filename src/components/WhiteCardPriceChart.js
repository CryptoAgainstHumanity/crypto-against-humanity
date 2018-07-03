import styled from 'styled-components';
import { COLORS_OBJ } from '../StyleGuide';
import { LineChart, Line } from 'recharts';
import React, { Component } from 'react';

class WhiteCardPriceChart extends Component {
constructor(props) {
  super(props)
}

  render() {
    const data = []
    data.push({name: 'block0', price: 0.005})
    data.push({name: 'block1', price: 0.005})
    for (var i = 0; i < this.props.events.length; i++) {
      data.push({name: this.props.events[i].blockNum, price: this.props.events[i].price})
    }
    return (
      <PriceChart>
        <LineChart width={96} height={72} data={data}>
          <Line type='monotone' dataKey='price' stroke={COLORS_OBJ.secondary.medium} strokeWidth={2} />
        </LineChart>
      </PriceChart>
    );
  }
}

export default WhiteCardPriceChart;

const PriceChart = styled.div`
  // border: 1px solid blue;
`;
