import _ from 'lodash'
import moment from 'moment'
import web3 from './web3'
import React, { Component } from "react";
import WhiteCardFactory from './web3Contracts/WhiteCardFactory'
import WhiteCard from './web3Contracts/WhiteCard'
import EthPolynomialCurveToken from './web3Contracts/EthPolynomialCurveToken'
import BlackCardRegistry from './web3Contracts/BlackCardRegistry'
import WhiteCardList from './components/white_card_list';
import WhiteCardListItem from './components/white_card_list_item';
import WhiteCardsInPlayView from './components/white_cards_in_play_view'
import BlackCardDisplay from './components/black_card_display';
import ipfsAPI from 'ipfs-api'

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingWhiteCards: true,
      loadingBlackCard: true,
      whiteCards: [],
      blackCard: {}
    };
  }

  componentWillMount() {

    const whiteCardTokenUnits = 10 ** 12 * 10 ** 18
    const defaultTokenBuyAmount = 0.001 * 10 ** 18

    WhiteCardFactory.getPastEvents('_WhiteCardCreated', {
      fromBlock: 3317454,
      toBlock: 'latest'
    }, async (err, events) => {
      let whiteCards = []
      const accounts = await web3.eth.getAccounts()
      for(var i = 0; i < events.length; i++) {
        let event = events[i]
        WhiteCard.options.address = event.returnValues.card
        let ipfsHash = await WhiteCard.methods.ipfsHash().call()
        let text = (await ipfs.object.data(ipfsHash)).toString()
        let bondingCurveAddress = await WhiteCard.methods.bondingCurve().call()
        EthPolynomialCurveToken.options.address = bondingCurveAddress
        let bondingCurvePrice = await EthPolynomialCurveToken.methods.getMintingPrice(defaultTokenBuyAmount).call()
        let bondingCurveBalance = await EthPolynomialCurveToken.methods.balanceOf(accounts[0]).call()
        let bondingCurveTotalBalance = await web3.eth.getBalance(bondingCurveAddress)

        whiteCards.push({
          text,
          bondingCurveAddress: bondingCurveAddress,
          totalBalance: parseInt(bondingCurveTotalBalance),
          balance: bondingCurveBalance / whiteCardTokenUnits,
          price: bondingCurvePrice / whiteCardTokenUnits,
          color: "white-card"
        })
      }

      whiteCards = _.orderBy(whiteCards, ['totalBalance'], ['desc'])

      this.setState({
        whiteCards: whiteCards,
        loadingWhiteCards: false
      })
    })

    BlackCardRegistry.getPastEvents('_Application', {
      fromBlock: 0,
      toBlock: 'latest'
    }, async (err, events) => {
      this.blackCards = events
      this.setBlackCard()
      this.startTimer()
    })

  }

  async setBlackCard () {
    const roundedTime = Math.floor(moment().unix() / 10) * 10
    const i = getRandomInt(roundedTime, 0, this.blackCards.length - 1)
    let ipfsHash = this.blackCards[i].returnValues.data
    let text
    try {
      let buffer = await ipfs.object.data(ipfsHash)
      text = (await ipfs.object.data(ipfsHash)).toString()
      if (buffer.toJSON().data.length > 27) {
        text = text.replace(/[^\x20-\xFF]/g, '')
        text = text.substring(1, text.length - 1)
      }
    } catch (err) {
      console.error(err)
      text = ipfsHash
    }
    let blackCard = { text , color: "black-card" }

    this.setState({
      blackCard: blackCard,
      loadingBlackCard: false
    })
  }

  startTimer () {
    var eventTime = Math.floor(moment().unix() / 10) * 10 + 10;
    var currentTime = moment().unix()
    var diffTime = eventTime - currentTime
    var duration = moment.duration(diffTime * 1000, 'milliseconds')
    var interval = 1000;

    var $this = this

    setInterval(function () {
      duration = moment.duration(duration - interval, 'milliseconds');
      $this.setState({
        timerDisplay: duration.hours() + " : " + duration.minutes() + " : " + duration.seconds()
      })
      if (duration.seconds() <= 0) {
        $this.setBlackCard()
        eventTime = Math.floor(moment().unix() / 10) * 10 + 10;
        currentTime = moment().unix()
        diffTime = eventTime - currentTime
        duration = moment.duration(diffTime * 1000, 'milliseconds')
      }
    }, interval);
  }

  render() {
    const blackCardElem = this.state.loadingBlackCard ? <div>Loading...</div> :
      <BlackCardDisplay blackCard={this.state.blackCard} timeRemaining={this.state.timerDisplay} className="center" />
    return (
        <div className="row current-round-page">

          <div className="column black-card-in-play">
            {blackCardElem}
          </div>

          <div className="column white-cards-in-play">
            <WhiteCardsInPlayView whiteCards={this.state.whiteCards} loading={this.state.loadingWhiteCards} />
          </div>

        </div>
    );
  }
}

function random(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomInt(seed, min, max) {
  return Math.floor(random(seed) * (max - min + 1)) + min;
}

export default Home;
