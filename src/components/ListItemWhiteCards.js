import Btn from './Button';
import Card from './Card';
import EthPolynomialCurveToken from '../web3Contracts/EthPolynomialCurveToken'
import InputText from './InputText';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import web3 from '../web3';
import WhiteCardPrice from './WhiteCardPrice';
import WhiteCardBalance from './WhiteCardBalance';
import {
  H1, LABEL, MEDIA,
} from '../StyleGuide';

const tokenUnits = 10 ** 8
const defaultTradeAmount = 1

class WhiteCardListItem extends Component {

	constructor(props) {
		super(props)

		this.state = {
			price: 0,
			tradeDisplayAmount: defaultTradeAmount,
      text: this.props.text
    }

		this.handleTradeDisplayAmountChange = this.handleTradeDisplayAmountChange.bind(this);
		// this.handleBuyClick = this.handleBuyClick.bind(this);
		// this.handleSellClick = this.handleSellClick.bind(this);
	}

	componentWillMount () {
		this.getBondingCurvePrice(defaultTradeAmount)
	}

  filterNonNumeric = (input) => {
    // Remove characters that aren't digits or dots
    const inputCleaned = input
      .replace(/[^\d\.]/g,'');
    // Only allow a single decimal place for floats
    const inputSplit = inputCleaned.split('.');
    const inputFiltered = inputSplit.shift() + (inputSplit.length ? '.' + inputSplit.join('') : '');
    return inputFiltered;
  }

	handleTradeDisplayAmountChange = (event) => {
		const filteredInput = this.filterNonNumeric(event.target.value);
    this.setState({ tradeDisplayAmount: filteredInput});
    if ((filteredInput !== '.') && (filteredInput < 10000000000000)) {
      this.getBondingCurvePrice(filteredInput);
    }
	}

	handleBuyClick = (event) => {
    this.mintTokens()
		event.preventDefault();
		const cardText = this.props.text;
        ReactGA.event({
            category: 'Bought White Card',
            action: cardText,
        });
	}

	handleSellClick = (event) => {
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
      .getMintingPrice(tokenVal).call()
		await EthPolynomialCurveToken.methods
			.mint(tokenVal).send({ value: bondingCurvePrice, from: accounts[0] })
	}

	async burnTokens () {
		const accounts = await web3.eth.getAccounts()
		let tokenVal = this.state.tradeDisplayAmount * tokenUnits
		EthPolynomialCurveToken.options.address = this.props.bondingCurveAddress
		let bondingCurvePrice = await EthPolynomialCurveToken.methods
			.burn(tokenVal).send({ from: accounts[0] })
	}

	async getBondingCurvePrice (displayVal) {
    var a = Number(this.props.totalSupply) + Number(displayVal * tokenUnits)
    var b = Number(this.props.poolBalance)
    var step1 = 10000000000 / 2
    var step2 = step1 * (a**2)
    var step3 = step2 / 10000000000
    var cardMintingPrice = step3 - b
    var cardPrice = (cardMintingPrice / 10 ** 18);
		this.setState({
			price: cardPrice
		})
	}

  testFunction = () => {
    console.log('Test Function');
  }

	render() {

    // If cards have re-arranged
    if (this.props.text != this.state.text) {
      this.setState({
        text: this.props.text,
        tradeDisplayAmount: defaultTradeAmount
      })
      this.getBondingCurvePrice(this.state.tradeDisplayAmount);
    }


    let priceRounded = '';
    if (this.props.price < 1000000) {
      priceRounded = precisionRound(this.props.price, 3);
    } else if (this.props.price < 1000000000) {
      priceRounded = precisionRound(this.props.price / 1000000, 3);
    } else {
      priceRounded = priceRounded = '🖐️ Bitch, please';
    }

    let balanceRounded = '';
    if (this.props.balance < 1) {
      balanceRounded = '-'
    } else {
      balanceRounded = precisionRound(this.props.balance, 1)
    }

		// const btnSell = this.props.balance == 0 ? null : (
		// 	<Btn primary onClick={this.handleSellClick}>
		// 		Sell
		// 	</Btn>
		// )

  //     <WhiteCardDash>
  //   <WhiteCardStats>
  //     <div>
  //       <LABEL>PRICE</LABEL>
  //       <H1>{priceRounded}</H1>
  //     </div>
  //     <div>
  //       <LABEL>BALANCE</LABEL>
  //       <H1>{balanceRounded}</H1>
  //     </div>
  //   </WhiteCardStats>


  //   <TradeForm controlId="formValidationWarning3" validationState="warning">
  //     <InputText type="text" onChange={this.handleTradeDisplayAmountChange} value={this.state.tradeDisplayAmount} placeholder="Quantity"/>
  //     <Btn primary onClick={this.handleBuyClick}>Buy</Btn>
  //     {btnSell}
  //   </TradeForm>
  // </WhiteCardDash>

		return (
			<ListItemWhiteCard>

        <Card smallCard white>{this.props.text}</Card>

        <WhiteCardPrice
          price={priceRounded}
          priceChange = {-0.0276}
        />

        <WhiteCardBalance
          balance={balanceRounded}
          handleBuyClick={this.handleBuyClick}
          handleSellClick={this.handleSellClick}
        />

        <Btn primary onClick={this.testFunction}>Buy</Btn>

			</ListItemWhiteCard>
		)
	}
};

const ListItemWhiteCard = styled.li`
  max-width: 488px;
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

  ${MEDIA.phone} {
    display:none
  }
`;

const WhiteCardStats = styled.div`
  flex: 0 1 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  H1 {
    margin: 0;
    max-width: 240px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }

  ${MEDIA.phone} {
    display:none
  }
`;

const TradeForm = styled.div`
  flex: 0 1 auto;

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
};

export default WhiteCardListItem;
