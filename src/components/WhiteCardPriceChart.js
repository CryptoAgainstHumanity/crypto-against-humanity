import styled from 'styled-components';
import { COLORS_OBJ } from '../StyleGuide';
import { LineChart, Line } from 'recharts';
import React, { Component } from 'react';

const DATA_POINTS = 28;
const DEFAULT_PRICE = 0.005;

class WhiteCardPriceChart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { blockNum, blockNumCurrent, blockNumFirstRelevant, priceFirstRelevant, events } = this.props;

    const relevantEvents = events.filter(event => event.blockNum >= blockNumFirstRelevant);
    const blocksPerInterval = (blockNumCurrent - blockNumFirstRelevant) / DATA_POINTS;

    const data = [];
    let intervalStart = blockNumFirstRelevant;
    let intervalEnd = intervalStart + blocksPerInterval;
    let priceLastInterval = priceFirstRelevant;

    for (let i = 0; i < (DATA_POINTS); i++) {
      if (blockNum > intervalEnd) {
        data.push({blockNum: intervalStart});
      } else {
        let price = DEFAULT_PRICE;

        const wasCreatedInInterval = ((intervalStart < blockNum) && (blockNum <= intervalEnd));
        if (!wasCreatedInInterval) {
          price = priceLastInterval;

          const eventsInInterval = relevantEvents.filter(event => ((intervalStart < event.blockNum) && (event.blockNum <= intervalEnd)));
          if (eventsInInterval.length > 0) {
            const lastEvent = eventsInInterval[eventsInInterval.length - 1];
            price = lastEvent.price;
          }
        }

        priceLastInterval = price
        data.push({blockNum: intervalStart, price: price});
      }

      intervalStart += blocksPerInterval;
      intervalEnd += blocksPerInterval;
    }

    // push last price, just incase event
    if (relevantEvents.length > 0) {
      const lastEvent = relevantEvents[(relevantEvents.length - 1)];
      data.push({blockNum: blockNumCurrent, price: lastEvent.price})
    }

    // Fixing bug in recharts which doesn't dispplay if no price change
    if (data[data.length - 1].price === DEFAULT_PRICE) {
      data.push({blockNum: blockNumCurrent, price: 0.004999})
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
