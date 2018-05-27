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

  // <Nav className = "white-card-filter" bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>

	render() {
		return (
			<div>

        <Nav className = "white-card-filter" activeKey="1" onSelect={k => this.handleSelect(k)}>
          <NavItem className = "white-card-filter-item-active" eventKey="1" href="#">
            <div className="lbl-text">GOOD SHIT</div>
          </NavItem>
          <NavItem className = "white-card-filter-item" disabled>
            <div className="lbl-text">TRENDING SHIT</div>
          </NavItem>
          <NavItem className = "white-card-filter-item" disabled>
            <div className="lbl-text">NEW SHIT</div>
          </NavItem>
          <NavItem className = "white-card-filter-item" disabled>
            <div className="lbl-text">YOUR SHIT</div>
          </NavItem>
        </Nav>
        <WhiteCardList whiteCards={this.state.whiteCards} className="center" />
      </div>
		);
	}
}

export default WhiteCardsInPlayView;
