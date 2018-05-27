import React, { Component } from "react";
import WhiteCardFactory from './web3Contracts/WhiteCardFactory'
import WhiteCardList from './components/white_card_list';
import WhiteCardListItem from './components/white_card_list_item';
import WhiteCardsInPlayView from './components/white_cards_in_play_view'
import BlackCardDisplay from './components/black_card_display';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      whiteCards: [
        {text: "Vitalik", balance: 0.746, price: 6.043, color: "white-card"},
        {text: "Big black cock", balance: 3.837, price: 0.780, color: "white-card"},
        {text: "Webcam girls", balance: 0.000, price: 873.004, color: "white-card"},
      ],
      blackCard: {text: "I was offended by ____ at ETH Buenos Aires", color: "black-card", timeRemaining: "43"}
    };
  }

  componentWillMount() {
    WhiteCardFactory.getPastEvents('_WhiteCardCreated', {
      fromBlock: 0,
      toBlock: 'latest'
    }, (err, evt) => {
      console.log('ERR: ', err)
      console.log('WHITE CARD CREATED: ', evt)
    })
  }

  render() {
    return (
        <div className="row current-round-page">

          <div className="column black-card-in-play">
            <BlackCardDisplay blackCard={this.state.blackCard} className="center" />
          </div>

          <div className="column white-cards-in-play">
            <WhiteCardsInPlayView whiteCards={this.state.whiteCards} />
          </div>

        </div>
    );
  }
}

export default Home;
