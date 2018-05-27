import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuBar, MenuItem, Button, FormGroup, FormControl, InputGroup, ControlLabel } from 'react-bootstrap'
import Card from './card';

class WhiteCardListItem extends Component {

	constructor(props) {
		super(props)

		this.state = {
			tradeKey: "buy"
		}
	}

	setTradeKey(key) {
		this.setState({tradeKey: key})
	}

	render() {
		return (
			<li className="white-card-row">

				<div className="white-card">
					<Card text={this.props.text} color={this.props.color}/>
				</div>

				<div className="left-side">
					<div className="white-card-labels">
						<div className="price-label-div">
							<div className='lbl-text'>PRICE</div>
							<div className='price-data header-1'>{this.props.price}</div>
						</div>
						<div className="balance-label-div">
							<div className='lbl-text'>BALANCE</div>
							<div className='balance-data header-1'>{this.props.balance}</div>
						</div>
					</div>
					<Nav className='trade-keys' bsStyle="pills" activeKey={this.state.tradeKey} onSelect={k => this.setTradeKey(k)}>
						<NavItem className='buy'eventKey="buy" href="#">
							Buy
						</NavItem>
						<NavItem className='sell' eventKey="sell" href="#">
							Sell
						</NavItem>
					</Nav>
					<FormGroup controlId="formValidationWarning3" validationState="warning">
						<InputGroup>
							<FormControl className={this.state.tradeKey} type="text" />
							<InputGroup.Addon>Trade</InputGroup.Addon>
						</InputGroup>
					</FormGroup>
				</div>

			</li>
		)
	}
}

export default WhiteCardListItem;
