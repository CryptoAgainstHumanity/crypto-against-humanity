import React from 'react';
import styled from 'styled-components';
import WhiteCardPriceChart from './WhiteCardPriceChart';
import { COLORS_OBJ, COLORS_TEXT, H2, LABEL } from '../StyleGuide';
import { PrecisionRound } from '../Utilities'

const SECONDS_PER_MONTH = 60*60*24*28;
const BLOCKS_PER_MONTH = SECONDS_PER_MONTH / 14; // assumed 14 second blocks
const INITIAL_PRICE = 0.005;

const WhiteCardPrice = (props) => {

  const { events, blockNumCurrent, blockNum, price } = props;

  const blockNumFirstRelevant = blockNumCurrent - BLOCKS_PER_MONTH;

  const eventsPrevious = events.filter(event => event.blockNum < blockNumFirstRelevant);
  const eventFirstRelevant = eventsPrevious[eventsPrevious - 1];
  const priceFirstRelevant = eventFirstRelevant?
    eventFirstRelevant.price:
    INITIAL_PRICE;
  const priceChange = price - priceFirstRelevant;
  const percentChange = PrecisionRound((priceChange / priceFirstRelevant) * 100, 2);

  // console.log('price ' + price);
  // console.log('price first relevant ' + priceFirstRelevant);
  // console.log('price change ' + priceChange);
  // console.log('percent change ' + percentChange);
  // console.log(' ');

  const percentChangeFormatted = percentChange > 999?
    String(percentChange/1000) + 'k':
    String(percentChange);

  let priceChangeFormatted = '';
  if (percentChange === 0) {
    priceChangeFormatted = <PriceChange noChange>-%</PriceChange>;
  } else if (percentChange < 0) {
    priceChangeFormatted = <PriceChange isNegativeChange>{percentChangeFormatted}%</PriceChange>;
  } else {
    priceChangeFormatted = <PriceChange>+{percentChangeFormatted}% </PriceChange>;
  }

  return (
      <Container>
        <div>
          <Label>PRICE</Label>
          <PriceDiv>
            <Tag>Ξ</Tag><H2>{price}</H2>
          </PriceDiv>
        </div>

        <div>
        <Label>LAST 28 DAYS</Label>
        {priceChangeFormatted}

        <WhiteCardPriceChart
          events={props.events}
          blockNum={blockNum}
          blockNumCurrent={blockNumCurrent}
          blockNumFirstRelevant={blockNumFirstRelevant}
          priceFirstRelevant= {priceFirstRelevant}
        />
        </div>

      </Container>
  );
};

const Container = styled.div`
  width: 160px;
  height: ${(160*1.2)}px;
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = LABEL.extend`
  height: 20px;
  font-size: 12px;
  margin: 0;
  color: ${COLORS_TEXT.bgLight.low}
`;

const PriceDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Tag = styled.span`
  margin-right: 4px;
  font-size: 14px;
  color: ${COLORS_TEXT.bgLight.low}
`;

const PriceChange = styled.div`
  color: ${props => props.isNegativeChange? COLORS_OBJ.primary.red : COLORS_OBJ.primary.green};
  font-weight: bold;
  text-align: right;
  // margin-bottom: auto;

  ${props => props.noChange? `color: ${COLORS_TEXT.bgLight.medium}` : ''};
`;

const PriceChart = styled.div`
  height: 72px;
  width: 96px;

  border: 1px solid blue;
`;

export default WhiteCardPrice;
