import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuBar, MenuItem, Button } from 'react-bootstrap'
import WhiteCardList from './white_card_list';
import WhiteCardListItem from './white_card_list_item';
import Card from './card';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class WhiteCardsInPlayView extends Component {
	constructor(props) {
		super(props)

    this.state = {
      whiteCards: this.props.whiteCards
    }
	}

	render() {
		return (
			<div>

        <Nav className = "white-card-filter" bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>
          <NavItem eventKey="1" href="#">
            Good Shit
          </NavItem>
          <NavItem disabled>
            Trending Shit
          </NavItem>
          <NavItem disabled>
            New Shit
          </NavItem>
          <NavItem disabled>
            Your Shit
          </NavItem>
        </Nav>
        <WhiteCardList whiteCards={this.state.whiteCards} className="center" />
      </div>
		);
	}
}

export default WhiteCardsInPlayView;
