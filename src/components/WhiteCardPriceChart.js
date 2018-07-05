import styled from 'styled-components';
import { COLORS_OBJ } from '../StyleGuide';
import { LineChart, Line } from 'recharts';
import React, { Component } from 'react';

const MAX_DATA_POINTS = 28;

class WhiteCardPriceChart extends Component {
constructor(props) {
  super(props)
}

  render() {
    const { blockNumCurrent, blockNumFirstRelevant, priceFirstRelevant, events } = this.props;

    const relevantEvents = events.filter(event => event.blockNum >= blockNumFirstRelevant);
    const blocksPerInterval = (blockNumCurrent - blockNumFirstRelevant) / MAX_DATA_POINTS;

    const data = [{blockNum: blockNumFirstRelevant,  price: priceFirstRelevant}];

    for (let i = 1; i < (MAX_DATA_POINTS); i++) {
      const intervalStart = blockNumFirstRelevant + ((i-1) * blocksPerInterval);
      const intervalEnd = blockNumFirstRelevant + (i * blocksPerInterval);
      let intervalPrice = data[i-1].price;
      relevantEvents.forEach(event => {
        if ((event.blockNum >= intervalStart) && (event.blockNum < intervalEnd)) {
          intervalPrice = event.price;
        }
      });
      data.push({blockNum: intervalEnd, price: intervalPrice});
    }

    return (
      <PriceChart>
        <LineChart width={96} height={56} data={data}>
        <defs>
          <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS_OBJ.secondary.medium} stopOpacity={1}/>
            <stop offset="95%" stopColor={COLORS_OBJ.secondary.low} stopOpacity={0.8}/>
          </linearGradient>
        </defs>
        <Line type='monotone' dataKey='price' stroke='url(#price)' strokeWidth={2} dot={false} activeDot={false} />
      </LineChart>
      </PriceChart>
    );
  }
}



export default WhiteCardPriceChart;

const PriceChart = styled.div`
  // border: 1px solid blue;
`;
