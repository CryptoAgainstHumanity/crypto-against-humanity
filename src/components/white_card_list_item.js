import web3 from '../web3'
import React, { Component } from 'react';
import { Nav, NavDropdown, MenuBar, MenuItem, Button, FormGroup, FormControl, InputGroup, ControlLabel } from 'react-bootstrap'
import EthPolynomialCurveToken from '../web3Contracts/EthPolynomialCurveToken'
import Card from './card';

const tokenUnits = 10 ** 8
const defaultTradeAmount = 5

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
	}

	handleSellClick (event) {
		event.preventDefault();
	}

	async mintTokens () {
		const accounts = await web3.eth.getAccounts()
		let tokenVal = this.state.tradeDisplayAmount * tokenUnits
		EthPolynomialCurveToken.options.address = this.props.bondingCurveAddress
		let bondingCurvePrice = await EthPolynomialCurveToken.methods
			.mint(tokenVal).send({ value: this.state.price * 10 ** 18, from: accounts[0] })
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
		const balanceStyled = (this.props.balance == 0)?
			'-':
			this.props.balance * 10 ** 4 * 10 ** 18;

		return (
			<li className="white-card-row">

				<div className="white-card">
					<Card text={this.props.text} color={this.props.color}/>
				</div>

				<div className="left-side">
					<div className="white-card-labels">
						<div className="price-label-div">
							<div className='lbl-text'>PRICE</div>
							<div className='price-data header-1'>Ξ {this.props.price}</div>
						</div>
						<div className="balance-label-div">
							<div className='lbl-text'>BALANCE</div>
							<div className='balance-data header-1'>{balanceStyled}</div>
						</div>
					</div>

					<div className="trade-div">
						<div className='trade-keys'>
							<Button onClick={this.handleBuyClick} >
								Buy
							</Button>
							<Button onClick={this.handleSellClick}>
								Sell
							</Button>
						</div>
						<FormGroup controlId="formValidationWarning3" validationState="warning">
							<InputGroup>
								<FormControl type="text" onChange={this.handleTradeDisplayAmountChange} value={this.state.tradeDisplayAmount} />
							</InputGroup>
						</FormGroup>
					</div>
				</div>

			</li>
		)
	}
}

export default WhiteCardListItem;
