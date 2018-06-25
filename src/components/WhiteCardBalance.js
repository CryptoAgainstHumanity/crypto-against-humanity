import Btn from './Button';
import React from 'react';
import styled from 'styled-components';
import { COLORS_OBJ, COLORS_TEXT, H3, LABEL } from '../StyleGuide';

const WhiteCardBalance = (props) => {

    const tagBalanceName = (props.balance === 1)?
      'card':
      'cards';

    if (props.balance > 0) {
      const tagBalance = <Tag>{tagBalanceName}</Tag>;
    } else {
      const hasNoBalance = true;
    }

    const sellBtn = (props.balance > 0)?
      <SellBtn>Sell Card</SellBtn>:
      <SellBtn hasNoBalance>Sell Card</SellBtn>;

    const tagBalance = (props.balance > 0)?
      <Tag>{tagBalanceName}</Tag>:
      null ;



    return (
      <Container>
        <Label>BALANCE</Label>
        <BalanceDiv>
          <H3>{props.balance}</H3>
          {tagBalance}
        </BalanceDiv>

        <TradeForm>
          <BuyBtn>Buy Card</BuyBtn>
          {sellBtn}
        </TradeForm>

      </Container>
  );
};

const Container = styled.div`
  flex: 0 0 176px;
  height: ${(160*1.2)}px;
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
`;

const Label = LABEL.extend`
  font-size: 14px;
  margin: 0;
`;

const BalanceDiv = styled.div`
  display: flex;
  align-items: flex-end;

  margin-bottom: auto;
`;

const Tag = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: ${COLORS_TEXT.bgLight.medium}
`;

const TradeForm = styled.div`
`;

const BuyBtn = Btn.extend`
  width: 100%;
  margin-bottom: 8px;

  border: 2px solid ${COLORS_OBJ.primary.green};
  color: ${COLORS_OBJ.primary.green};

  :hover {
    background-color: ${COLORS_OBJ.primary.green};
    border: 2px solid ${COLORS_OBJ.primary.green};
    color: white;
  }
`;

const SellBtn = Btn.extend`
  width: 100%;

  ${props => props.hasNoBalance?
    `
    border: 2px solid ${COLORS_OBJ.secondary.low};
    color: ${COLORS_TEXT.bgLight.low};
    :hover {
      background-color: transparent;
      border: 2px solid ${COLORS_OBJ.secondary.low};
      color: ${COLORS_TEXT.bgLight.low};
      cursor: default;
    }

    `:
    ''
  }
`;

export default WhiteCardBalance;
