import web3 from './web3'
import React, { Component } from "react";
import WhiteCardFactory from './web3Contracts/WhiteCardFactory'
import WhiteCard from './web3Contracts/WhiteCard'
import EthPolynomialCurveToken from './web3Contracts/EthPolynomialCurveToken'
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
    const whiteCardTokenUnits = 10 ** 12 * 10 ** 18
    const defaultTokenBuyAmount = 0.001 * 10 ** 18

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
        let bondingCurveAddress = await WhiteCard.methods.bondingCurve().call()
        EthPolynomialCurveToken.options.address = bondingCurveAddress
        let bondingCurvePrice = await EthPolynomialCurveToken.methods.getMintingPrice(defaultTokenBuyAmount).call()

        const accounts = await web3.eth.getAccounts()
        let bondingCurveBalance = await EthPolynomialCurveToken.methods.balanceOf(accounts[0]).call()

        whiteCards.push({
          text: ipfsHash,
          balance: bondingCurveBalance / whiteCardTokenUnits,
          price: bondingCurvePrice / whiteCardTokenUnits,
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
