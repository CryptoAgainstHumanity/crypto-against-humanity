import React, { Component } from 'react';
import WhiteCardList from './ListWhiteCards';
import styled from 'styled-components';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { LOADING } from '../StyleGuide';

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
    <LOADING><i className="fa fa-circle-o-notch fa-spin"></i> Loading people's lousy submissions... </LOADING>:
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
