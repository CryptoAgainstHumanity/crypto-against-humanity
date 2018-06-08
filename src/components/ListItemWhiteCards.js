import web3 from '../web3'
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Nav, NavDropdown, MenuBar, MenuItem, Button, FormGroup, FormControl, InputGroup, ControlLabel } from 'react-bootstrap'
import styled from 'styled-components';
import EthPolynomialCurveToken from '../web3Contracts/EthPolynomialCurveToken'
import Btn from './Button';
import Card from './Card';
import InputText from './InputText';
import {
  H1, LABEL,
} from '../StyleGuide';

const tokenUnits = 10 ** 8
const defaultTradeAmount = 1

class WhiteCardListItem extends Component {

	constructor(props) {
		super(props)

		this.state = {
			price: 0,
			tradeDisplayAmount: defaultTradeAmount
		}

		this.handleTradeDisplayAmountChange = this.handleTradeDisplayAmountChange.bind(this);
		this.handleBuyClick = this.handleBuyClick.bind(this);
		this.handleSellClick = this.handleSellClick.bind(this);
	}

	componentWillMount () {
		this.getBondingCurvePrice(defaultTradeAmount)
	}

	handleTradeDisplayAmountChange (event) {
		this.setState({ tradeDisplayAmount: event.target.value })
		this.getBondingCurvePrice(event.target.value)
	}

	handleBuyClick (event) {
		this.mintTokens()
		event.preventDefault();
		const cardText = this.props.text;
        ReactGA.event({
            category: 'Bought White Card',
            action: cardText,
        });
	}

	handleSellClick (event) {
		this.burnTokens()
		event.preventDefault();
		const cardText = this.props.text;
        ReactGA.event({
            category: 'Sold White Card',
            action: cardText,
        });
	}

	async mintTokens () {
		const accounts = await web3.eth.getAccounts()
		let tokenVal = this.state.tradeDisplayAmount * tokenUnits
		EthPolynomialCurveToken.options.address = this.props.bondingCurveAddress
		let bondingCurvePrice = await EthPolynomialCurveToken.methods
			.mint(tokenVal).send({ value: this.state.price * 10 ** 18, from: accounts[0] })
	}

	async burnTokens () {
		const accounts = await web3.eth.getAccounts()
		let tokenVal = this.state.tradeDisplayAmount * tokenUnits
		EthPolynomialCurveToken.options.address = this.props.bondingCurveAddress
		let bondingCurvePrice = await EthPolynomialCurveToken.methods
			.burn(tokenVal).send({ from: accounts[0] })
	}

	async getBondingCurvePrice (displayVal) {
		let tokenVal = displayVal * tokenUnits
		EthPolynomialCurveToken.options.address = this.props.bondingCurveAddress
		let bondingCurvePrice = await EthPolynomialCurveToken.methods
			.getMintingPrice(tokenVal).call()
		this.setState({
			price: bondingCurvePrice / 10 ** 18
		})
	}

	render() {

    const priceRounded = (this.state.price > 1000000)?
      `${precisionRound(this.state.price / 1000000, 3)} Mns`:
      precisionRound(this.state.price, 3);

		const balanceRounded = (this.props.balance == 0)?
			'-':
			precisionRound(this.props.balance * 10 ** 4 * 10 ** 18, 3);

		const btnSell = this.props.balance == 0 ? null : (
			<Btn primary onClick={this.handleSellClick}>
				Sell
			</Btn>
		)

		return (
			<ListItemWhiteCard>

        <Card smallCard white>{this.props.text}</Card>

        <WhiteCardDash>
          <WhiteCardStats>
            <div>
              <LABEL>PRICE</LABEL>
              <H1>Ξ {priceRounded}</H1>
            </div>
            <div>
              <LABEL>BALANCE</LABEL>
              <H1>{balanceRounded}</H1>
            </div>
          </WhiteCardStats>


          <TradeForm controlId="formValidationWarning3" validationState="warning">
            <InputText type="text" onChange={this.handleTradeDisplayAmountChange} value={this.state.tradeDisplayAmount} placeholder="Quantity"/>
            <Btn primary onClick={this.handleBuyClick}>Buy</Btn>
            {btnSell}
          </TradeForm>
        </WhiteCardDash>

			</ListItemWhiteCard>
		)
	}
}

const ListItemWhiteCard = styled.li`
  width: 505px;
  padding: 0px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  >div:first-child {
    flex: 0 0 auto;
  }

  :not(:first-child) {
    margin-top: 24px;
  }
`;

const WhiteCardDash = styled.div`
  flex: 1 1 auto;
  padding: 24px 0 16px 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WhiteCardStats = styled.div`
  flex: 0 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  H1 {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TradeForm = styled.div`
  flex: 0 0 auto;

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;

  input {
    flex: 1 1 auto;
    max-width: 182px;
  }

  button {
    flex: 0 0 auto;
  }

  >:not(:first-child) {
    margin-left: 8px;
  }
`;

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export default WhiteCardListItem;
