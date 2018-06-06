import web3 from '../web3'
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { Nav, NavDropdown, MenuBar, MenuItem, Button, FormGroup, FormControl, InputGroup, ControlLabel } from 'react-bootstrap'
import EthPolynomialCurveToken from '../web3Contracts/EthPolynomialCurveToken'
import Card from './card';

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
        ReactGA.event({
            category: 'White Card Market',
            action: 'Clicked Buy',
        });
	}

	handleSellClick (event) {
		this.burnTokens()
		event.preventDefault();
        ReactGA.event({
            category: 'White Card Market',
            action: 'Clicked Sell',
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
		const styleTradeBtn = {
      width: '60px',
      height: '40px',
      marginLeft: '10px',

      borderRadius: '4px',
      backgroundColor: '#d94a4d',
      border: 'none',
      boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)',

      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
    }

    const styleQuantityInput = {
    	borderRadius: '4px',
      backgroundColor: '#F6F7F9',
      boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)',
      border: 'none',
      height: '40px',
      // width: '60px',
    }

		let balanceStyled = (this.props.balance == 0)?
			'-':
			precisionRound(this.props.balance * 10 ** 4 * 10 ** 18, 3);

		const sellBtn = this.props.balance == 0 ? null : (
			<Button onClick={this.handleSellClick} style={styleTradeBtn}>
				Sell
			</Button>
		)

		return (
			<li className="white-card-row">

				<div className="white-card">
					<Card text={this.props.text} color={this.props.color}/>
				</div>

				<div className="left-side">
					<div className="white-card-labels">
						<div className="price-label-div">
							<div className='lbl-text'>PRICE</div>
							<div className='price-data header-1'>Ξ {this.state.price}</div>
						</div>
						<div className="balance-label-div">
							<div className='lbl-text'>BALANCE</div>
							<div className='balance-data header-1'>{balanceStyled}</div>
						</div>
					</div>

					<div className="trade-div">
						<FormGroup controlId="formValidationWarning3" validationState="warning">
							<InputGroup>
								<FormControl type="text" onChange={this.handleTradeDisplayAmountChange} value={this.state.tradeDisplayAmount} style={styleQuantityInput}/>
							</InputGroup>
						</FormGroup>
						<div className='trade-keys'>
							<Button onClick={this.handleBuyClick} style={styleTradeBtn}>
								Buy
							</Button>
							{sellBtn}
						</div>
					</div>
				</div>

			</li>
		)
	}
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export default WhiteCardListItem;
