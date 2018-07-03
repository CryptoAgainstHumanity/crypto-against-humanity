import React from 'react';
import styled from 'styled-components';
import WhiteCardPriceChart from './WhiteCardPriceChart';
import { COLORS_OBJ, COLORS_TEXT, H3, LABEL } from '../StyleGuide';
import { PrecisionRound } from '../Utilities'

const WhiteCardPrice = (props) => {

  //const percentChange = props.priceChange * 100

  var percentChange = 0
  if (props.events.length > 1) {
    const A = props.events[props.events.length - 1].price - props.events[props.events.length - 2].price
    const B = props.events[props.events.length - 1].price
    percentChange = PrecisionRound((A / B) * 100, 2);
  } else if (props.events.length == 1) {
    percentChange = 100
  }


  const priceChange = (percentChange < 0)?
    <PriceChange isNegativeChange>{percentChange}%</PriceChange>:
    <PriceChange>{percentChange}%</PriceChange>;

  return (
      <Container>
        <Label>PRICE</Label>
        <PriceDiv>
          <Tag>Ξ</Tag><H3>{props.price}</H3>
        </PriceDiv>
        {priceChange}

        <WhiteCardPriceChart
          events={props.events}
        />

      </Container>
  );
};

const Container = styled.div`
  width: 160px;
  height: ${(160*1.2)}px;
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
`;

const Label = LABEL.extend`
  font-size: 14px;
  margin: 0;
`;

const PriceDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Tag = styled.span`
  margin-right: 4px;
  font-size: 14px;
  color: ${COLORS_TEXT.bgLight.medium}
`;

const PriceChange = styled.div`
  color: ${props => props.isNegativeChange? COLORS_OBJ.primary.red : COLORS_OBJ.primary.green};
  margin-bottom: auto;
`;

const PriceChart = styled.div`
  height: 72px;
  width: 96px;

  border: 1px solid blue;
`;

export default WhiteCardPrice;
