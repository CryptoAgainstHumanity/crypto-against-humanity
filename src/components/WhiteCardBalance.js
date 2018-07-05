import Btn from './Button';
import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS_OBJ, COLORS_TEXT, H2, LABEL, MEDIA } from '../StyleGuide';

class WhiteCardBalance extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buyPrice: 0,
      sellPrice: 0,
      buyBtnText: 'Buy Card',
      sellBtnText: 'Sell Card',
    }
  }

  componentDidMount() {
    this.setState({buyPrice: this.props.buyPrice});
    this.setState({sellPrice: this.props.sellPrice});
  }

  onMouseEnterBuyBtn = () => {
    this.setState({buyBtnText: `${this.props.buyPrice} ETH`});
  }

  onMouseLeaveBuyBtn = () => {
    this.setState({buyBtnText: 'Buy Card'});
  }

  onMouseEnterSellBtn = () => {
    this.setState({sellBtnText: `${this.props.sellPrice} ETH`});
  }

  onMouseLeaveSellBtn = () => {
    this.setState({sellBtnText: 'Sell Card'});
  }

  render() {

    const {balance, handleSellClick, handleBuyClick } = this.props;

    const tagBalanceName = (balance === 1)?
      'card':
      'cards';

    if (balance > 0) {
      const tagBalance = <Tag>{tagBalanceName}</Tag>;
    } else {
      const hasNoBalance = true;
    };

    const sellBtn = (balance > 0)?
      <SellBtn
        onClick={handleSellClick}
        onMouseEnter={this.onMouseEnterSellBtn}
        onMouseLeave={this.onMouseLeaveSellBtn}
      >{this.state.sellBtnText}</SellBtn>
      :
      <SellBtn
        hasNoBalance
      >{this.state.sellBtnText}</SellBtn>;

    const buyBtn = <BuyBtn
        onClick={handleBuyClick}
        onMouseEnter={this.onMouseEnterBuyBtn}
        onMouseLeave={this.onMouseLeaveBuyBtn}
      >{this.state.buyBtnText}</BuyBtn>

    const tagBalance = (balance > 0)?
      <Tag>{tagBalanceName}</Tag>:
      null ;

    return (
      <Container>
        <Label>BALANCE</Label>
        <BalanceDiv>
          <H2>{balance}</H2>
          {tagBalance}
        </BalanceDiv>

        <TradeForm>
          {buyBtn}
          {sellBtn}
        </TradeForm>

      </Container>
    );
  }
};

const Container = styled.div`
  flex: 0 0 180px;
  height: ${(160*1.2)}px;
  padding: 16px 32px;
  display: flex;
  flex-direction: column;

  ${MEDIA.phone} {
    display:none
  }
`;

const Label = LABEL.extend`
  height: 20px;
  font-size: 12px;
  margin: 0;
  color: ${COLORS_TEXT.bgLight.low}
`;

const BalanceDiv = styled.div`
  display: flex;
  align-items: flex-end;

  margin-bottom: auto;
`;

const Tag = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: ${COLORS_TEXT.bgLight.low}
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
    ''}
`;

export default WhiteCardBalance;
