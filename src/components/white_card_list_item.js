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
			<li className="list-group-item" style={{position: 'relative'}}>

				<div className="rightSide" style={{position: 'absolute'}}>
					<Card text={this.props.text} color={this.props.color}/>
				</div>

				<div className="leftSide" style={{"margin-left": '100px'}}>
					<p className='price-label'>PRICE</p>
					<p className='price-data'>{this.props.price}</p>
					<p className='balance-label'>BALANCE</p>
					<p className='balance-data'>{this.props.balance}</p>
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
