import React, { Component } from 'react';
import ListWhiteCards from './ListWhiteCards';
import styled from 'styled-components';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

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
		return (
			<Container>
        <ListWhiteCards whiteCards={this.props.whiteCards}/>
      </Container>
		);
	}
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100vh - 64px - 64px);
  width: 528px;
  overflow: auto;
`;

export default ContainerWhiteCards;
