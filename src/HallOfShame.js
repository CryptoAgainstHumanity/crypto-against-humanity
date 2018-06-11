import React, { Component } from "react";
import ReactGA from 'react-ga';
import styled from 'styled-components';
import ContainerColumn from './components/ContainerColumn';
import HallOfShameListItem from "./components/ListItemHallOfShame";
import { H1 } from './StyleGuide';

class HallOfShame extends Component {
  constructor(props) {
    super(props)
    this.state = {
    pastWinners: [
      {blackCardTxt:'Step 1: _____ \n Step 2: Profit.', whiteCardTxt:'Hodlgang',  price:'4.2121', date:'27 May 18'},
      {blackCardTxt:'What\'s a hodler\'s best friend?', whiteCardTxt:'Vitalik Buterin', price:'2.3329', date:'27 May 18'},
      {blackCardTxt:'_____, Satoshi\'s true vision', whiteCardTxt:'Bitconnect', price:'3.8739', date:'26 May 18'},
      {blackCardTxt:'Oh boy Johnny! ______!', whiteCardTxt:'Its over 9000!!!!', price:'1.7832', date:'26 May 18'},
    ]
    }
    ReactGA.initialize('UA-120470128-1');
    ReactGA.pageview(window.location.hash);
  }

  render() {

    console.log(this.state.pastWinners);
    const pastWinners = this.state.pastWinners
      .map((winner) => <HallOfShameListItem
        key={winner.whiteCardTxt}
        blackCardTxt={winner.blackCardTxt}
        whiteCardTxt={winner.whiteCardTxt}
        price={winner.price}
        date={winner.date}
      />);

    return (
      <ContainerColumn>
        <H1>Hall of Shame 💩</H1>
        <HallOfShameList>
          {pastWinners}
        </HallOfShameList>
      </ContainerColumn>
    );
  }
}

const HallOfShameList = styled.ul`
  padding: 0;
`;

export default HallOfShame;