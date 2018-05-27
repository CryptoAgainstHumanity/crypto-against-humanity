import React, { Component } from "react";
import WhiteCardFactory from './web3Contracts/WhiteCardFactory'
import WhiteCard from './web3Contracts/WhiteCard'
import WhiteCardList from './components/white_card_list';
import WhiteCardListItem from './components/white_card_list_item';
import WhiteCardsInPlayView from './components/white_cards_in_play_view'
import BlackCardDisplay from './components/black_card_display';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingCards: true,
      whiteCards: [],
      blackCard: {text: "I was offended by ____ at ETH Buenos Aires", color: "black-card", timeRemaining: "43"}
    };
  }

  componentWillMount() {
    WhiteCardFactory.getPastEvents('_WhiteCardCreated', {
      fromBlock: 0,
      toBlock: 'latest'
    }, async (err, events) => {
      let whiteCards = []
      for(var i = 0; i < events.length; i++) {
        let event = events[i]
        WhiteCard.options.address = event.returnValues.card
        let creator = await WhiteCard.methods.creator().call()
        let ipfsHash = await WhiteCard.methods.ipfsHash().call()
        whiteCards.push({
          text: ipfsHash,
          balance: 0.1234,
          price: 7.654,
          color: "white-card"
        })
      }
      this.setState({
        whiteCards: whiteCards,
        loadingCards: false 
      })
    })
  }

  render() {
    return (
        <div className="row current-round-page">

          <div className="column black-card-in-play">
            <BlackCardDisplay blackCard={this.state.blackCard} className="center" />
          </div>

          <div className="column white-cards-in-play">
            <WhiteCardsInPlayView whiteCards={this.state.whiteCards} loading={this.state.loadingCards} />
          </div>

        </div>
    );
  }
}

export default Home;
