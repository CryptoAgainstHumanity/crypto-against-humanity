import React, { Component } from "react";
import HallOfShameItem from "./components/hall_of_shame_item"

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
  }

  render() {

    console.log(this.state.pastWinners);
    const pastWinners = this.state.pastWinners
      .map((winner) => <HallOfShameItem
        key={winner.whiteCardTxt}
        blackCardTxt={winner.blackCardTxt}
        whiteCardTxt={winner.whiteCardTxt}
        price={winner.price}
        date={winner.date}
      />);

    return (
      <div>
        <div className="header-1 hall-of-shame-title">Hall of Shame 💩</div>
        <ul className="white-card-list">
          {pastWinners}
        </ul>
      </div>
    );
  }
}

export default HallOfShame;