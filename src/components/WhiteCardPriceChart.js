import styled from 'styled-components';
import { COLORS_OBJ } from '../StyleGuide';
import { LineChart, Line } from 'recharts';
import React, { Component } from 'react';

const MAX_DATA_POINTS = 10;

class WhiteCardPriceChart extends Component {
constructor(props) {
  super(props)
}

  render() {
    const { blockNumCurrent, blockNumFirstRelevant, priceFirstRelevant, events } = this.props;

    const relevantEvents = events.filter(event => event.blockNum >= blockNumFirstRelevant);
    const blocksPerInterval = (blockNumCurrent - blockNumFirstRelevant) / MAX_DATA_POINTS;


    // const relevantBlocksCount = blockNumCurrent - blockNumFirstRelevant;
    // console.log(relevantBlocksCount);
    const data = [{blockNum: blockNumFirstRelevant,  price: priceFirstRelevant}];
    // for (let blockNum = blockNumFirstRelevant; blockNum < blockNumCurrent; blockNum++) {
    // //   data.push({blockNum: blockNum, price: defaultPrice});
    //   // console.log('test');
    // }
    for (let i = 1; i < (MAX_DATA_POINTS - 1); i++) {
      const intervalStart = blockNumFirstRelevant + ((i-1) * blocksPerInterval);
      const intervalEnd = blockNumFirstRelevant + (i * blocksPerInterval);
      relevantEvents.forEach(event => {
        if ((event.blockNum >= intervalStart) && (event.blockNum < intervalEnd)) {
          data.push({blockNum: intervalStart, price: event.price});
        } else {
          const lastPrice = data[i-1].price;
          data.push({blockNum: intervalStart, price: lastPrice});
        }
      });
    }
    // console.log(blockNumCurrent);
    // console.log('DONE');
    // const data = [];
    // data.push({blockNum: '0', price: 0.005})
    // data.push({blockNum: '1', price: 0.005})
    // for (var i = 0; i < relevantEvents.length; i++) {
    //   data.push({blockNum: relevantEvents[i].blockNum, price: relevantEvents[i].price})
    // }

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
