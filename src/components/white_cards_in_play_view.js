import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuBar, MenuItem, Button } from 'react-bootstrap'
import WhiteCardList from './white_card_list';
import WhiteCardListItem from './white_card_list_item';
import Card from './card';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class WhiteCardsInPlayView extends Component {
	constructor(props) {
    super(props)
  }

	render() {
    const whiteCardsListElem = this.props.loading ? <div>Loading...</div> :
      <WhiteCardList whiteCards={this.props.whiteCards} className="center" />

		return (
			<div>
        <row>
          <h1 className="buy-your-hand left"> Buy Your Hand! </h1>
        </row>
        <Nav bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>
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
        {whiteCardsListElem}
      </div>
		);
	}
}

export default WhiteCardsInPlayView;
