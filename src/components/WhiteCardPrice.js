import React from 'react';
import styled from 'styled-components';
import { COLORS_OBJ, COLORS_TEXT, H3, LABEL } from '../StyleGuide';

const WhiteCardPrice = (props) => {

  const percentChange = props.priceChange * 100
  const isNegativeChange = (props.priceChange < 0)?
    true:
    false;

  return (
      <Container>
        <Label>PRICE</Label>
        <PriceDiv>
          <Tag>Ξ</Tag><H3>{props.price}</H3>
        </PriceDiv>
        <PriceChange isNegativeChange>{percentChange}%</PriceChange>

        <PriceChart>
          Placeholder
        </PriceChart>

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
