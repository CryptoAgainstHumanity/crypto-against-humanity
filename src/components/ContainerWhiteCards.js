import React, { Component } from 'react';
import { Nav, NavItem, NavDropdown, MenuBar, MenuItem, Button } from 'react-bootstrap'
import WhiteCardList from './ListWhiteCards';
import styled from 'styled-components';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class ContainerWhiteCards extends Component {
	constructor(props) {
    super(props)
  }

  // <Nav className = "white-card-filter" bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>

  // Removed filter options until functionality implemented
        //   <Nav className = "white-card-filter" activeKey="1" onSelect={k => this.handleSelect(k)}>
        //   <NavItem className = "white-card-filter-item-active" eventKey="1" href="#">
        //     <div className="lbl-text">GOOD SHIT</div>
        //   </NavItem>
        //   <NavItem className = "white-card-filter-item" disabled>
        //     <div className="lbl-text">TRENDING SHIT</div>
        //   </NavItem>
        //   <NavItem className = "white-card-filter-item" disabled>
        //     <div className="lbl-text">NEW SHIT</div>
        //   </NavItem>
        //   <NavItem className = "white-card-filter-item" disabled>
        //     <div className="lbl-text">YOUR SHIT</div>
        //   </NavItem>
        // </Nav>

	render() {
    const whiteCardsListElem = this.props.loading ?
    <div>Loading...</div> :
    <WhiteCardList whiteCards={this.props.whiteCards} className="center" />;

		return (
			<Container>
        {whiteCardsListElem}
      </Container>
		);
	}
}

const Container = styled.div`
  display: flex;
  flex-direction: columns;
`;

export default ContainerWhiteCards;
