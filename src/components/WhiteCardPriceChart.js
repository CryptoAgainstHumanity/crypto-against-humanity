import styled from 'styled-components';
import { COLORS_OBJ } from '../StyleGuide';
import { LineChart, Line } from 'recharts';
import React, { Component } from 'react';

class WhiteCardPriceChart extends Component {
constructor(props) {
  super(props)
}

  render() {
    const { blockNumCurrent, blockNumFirstRelevant, events } = this.props;

    const relevantEvents = events.filter(event => event.blockNum >= blockNumFirstRelevant);

    const data = [];
    data.push({blockNum: '0', price: 0.005})
    data.push({blockNum: '1', price: 0.005})
    for (var i = 0; i < relevantEvents.length; i++) {
      data.push({blockNum: relevantEvents[i].blockNum, price: relevantEvents[i].price})
    }

    return (
      <PriceChart>
        <LineChart width={96} height={56} data={data}>
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
