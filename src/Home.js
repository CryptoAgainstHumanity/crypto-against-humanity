import _ from 'lodash'
import moment from 'moment'
import web3 from './web3'
import React, { Component } from "react";
import ReactGA from 'react-ga';
import CachedCards from './data/cachedCards'
import CachedBlock from './data/cachedBlock'
import WhiteCardFactory from './web3Contracts/WhiteCardFactory'
import WhiteCard from './web3Contracts/WhiteCard'
import EthPolynomialCurveToken from './web3Contracts/EthPolynomialCurveToken'
import BlackCardRegistry from './web3Contracts/BlackCardRegistry'
import ContainerWhiteCards from './components/ContainerWhiteCards'
import ContainerBlackCard from './components/ContainerBlackCard';
import ipfsAPI from 'ipfs-api';
import { LOADING } from './StyleGuide';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import ContainerRow from './components/ContainerRow';

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
const blackCardTimeInterval = 10000

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingWhiteCards: true,
      loadingBlackCard: true,
      whiteCards: [],
      blackCard: {},
      originBlock: 3317454
    };
    ReactGA.initialize('UA-120470128-1');
    ReactGA.pageview(window.location.hash);

    if (localStorage.getItem("cached-block") < CachedBlock) {
      localStorage.setItem("cached-block", CachedBlock);
      localStorage.setItem("cached-cards", JSON.stringify(CachedCards));
    }
  }

  componentWillMount() {

    // Check if we have cached previous white cards.
    var originBlock = this.state.originBlock;
    const cachedFromBlock = localStorage.getItem("cached-block");
    const cachedCards = JSON.parse(localStorage.getItem("cached-cards"));
    const currentBlock = this.getCurrentBlock

    if (cachedFromBlock) {
      //Cache exists, update from cached block
      this.loadWhiteCards(cachedFromBlock);
    } else {
      // No Cahce, get all cards
      this.loadWhiteCards(originBlock);
    }

    BlackCardRegistry.getPastEvents('_Application', {
      fromBlock: originBlock,
      toBlock: 'latest'
    }, async (err, events) => {
      this.blackCards = events
      this.setBlackCard()
      this.startTimer()
    })

  }

  async updateFromBlock(blockNum) {
    this.loadWhiteCards(blockNum);
  }

  async getCurrentBlock() {
    const block = await web3.eth.getBlock('latest');
    return block.number;
  }

  async updateWhiteCards () {
    this.loadWhiteCards(this.state.originBlock)
  }

  async loadWhiteCards(blockNum) {
    this.setState({
        loadingWhiteCards: true
    })
    const whiteCardTokenUnits = 10 ** 12 * 10 ** 18
    const defaultTokenBuyAmount = 0.001 * 10 ** 18
    var cachedCards = JSON.parse(localStorage.getItem("cached-cards"));
    const accounts = await web3.eth.getAccounts()

    let updatedCards = []
    if (cachedCards){
      let whiteCards = cachedCards;
      for (var i = 0; i < cachedCards.length; i++) {
        EthPolynomialCurveToken.options.address = cachedCards[i].bondingCurveAddress;
        const card = cachedCards[i]
        const cardName = cachedCards[i].text;
        let needsPriceUpdate = false;
        let needsBalanceUpdate = false;
        var bondingCurvePrice = cachedCards[i].price;

        await EthPolynomialCurveToken.getPastEvents(['Minted', 'Burned'], {fromBlock: this.state.originBlock, toBlock: 'latest'}, async (err, events) => {
          for(var j = 0; j < events.length; j++) {
            let event = events[j];
            if (event.returnValues.caller == accounts[0]){
              needsBalanceUpdate = true;
            }
            if (event.blockNumber > blockNum) {
              needsPriceUpdate = true;
            }
          }
        })

        if (needsPriceUpdate) {
          // For now I'm just calling the contract, I attempted to do the math locally, but it was off. I'll come back to it TODO
          let bondingCurvePrice = await EthPolynomialCurveToken.methods.getMintingPrice(defaultTokenBuyAmount).call();
          card.price = (bondingCurvePrice / whiteCardTokenUnits).toFixed(7);
          whiteCards[i].price = await card.price;
        }
        if (needsBalanceUpdate) {
          // Ee can keep track of this without calling the contract by adding subtracting the burn events
          let balance = await EthPolynomialCurveToken.methods.balanceOf(accounts[0]).call()
          card.balance = balance / whiteCardTokenUnits
          whiteCards[i].balance = await card.balance;
        } else {
          whiteCards[i].balance = 0; // This account has never burned or minted, so their balance is 0
        }
      }
      updatedCards = _.orderBy(whiteCards, ['price'], ['desc']);
    }

    WhiteCardFactory.getPastEvents('_WhiteCardCreated', {
      fromBlock: blockNum,
      toBlock: 'latest'
    }, async (err, events) => {
      let newBlockNum = await web3.eth.getBlock('latest');
      let whiteCards = []
      if (cachedCards && blockNum != this.state.originBlock) {
        whiteCards = cachedCards;
        if (updatedCards.length > 0) {
          whiteCards = updatedCards;
        }
      }
      for(var i = 0; i < events.length; i++) {
        let event = events[i]
        WhiteCard.options.address = event.returnValues.card
        let ipfsHash = await WhiteCard.methods.ipfsHash().call()
        let text = (await ipfs.object.data(ipfsHash)).toString()
        let bondingCurveAddress = await WhiteCard.methods.bondingCurve().call()
        EthPolynomialCurveToken.options.address = bondingCurveAddress
        let bondingCurvePrice = await EthPolynomialCurveToken.methods.getMintingPrice(defaultTokenBuyAmount).call()
        let bondingCurveBalance = await EthPolynomialCurveToken.methods.balanceOf(accounts[0]).call()
        // Used for math if we want to calculate price locally
        // let bondingCurveTotalSupply = await EthPolynomialCurveToken.methods.totalSupply().call(); 
        // let bondingCurvePoolBalance = await EthPolynomialCurveToken.methods.poolBalance().call();

        whiteCards.push({
          text,
          bondingCurveAddress: bondingCurveAddress,
          balance: bondingCurveBalance / whiteCardTokenUnits,
          price: bondingCurvePrice / whiteCardTokenUnits,
          // totalSupply: bondingCurveTotalSupply,
          // poolBalance: bondingCurvePoolBalance,
          color: "white-card"
        })
      }
      whiteCards = _.orderBy(whiteCards, ['price'], ['desc'])
      localStorage.setItem("cached-block", JSON.stringify(newBlockNum.number));
      localStorage.setItem("cached-cards", JSON.stringify(whiteCards));

      this.setState({
        whiteCards: whiteCards,
        loadingWhiteCards: false
      })
    })
  }

  async setBlackCard () {
    const roundedTime = getRoundedTime()
    const i = getRandomInt(roundedTime, 0, this.blackCards.length - 1)
    let blackCard = { text: 'My centralized point of failure connection to ______ is down!', color: "black-card" }
    let text
    if (this.blackCards.length > 0) {
      let ipfsHash = this.blackCards[i].returnValues.data
      try {
        let buffer = await ipfs.object.data(ipfsHash)
        text = (await ipfs.object.data(ipfsHash)).toString()
        if (buffer.toJSON().data.length > 37) {
          text = text.replace(/[^\x20-\xFF]/g, '')
          text = text.substring(1, text.length - 1)
        }
      } catch (err) {
        console.error(err)
        text = ipfsHash
      }
      blackCard = { text , color: "black-card" }
    }

    this.setState({
      blackCard: blackCard,
      loadingBlackCard: false
    })
  }

  startTimer () {
    var eventTime = getRoundedTime() + blackCardTimeInterval;
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
        eventTime = getRoundedTime() + blackCardTimeInterval;
        currentTime = moment().unix()
        diffTime = eventTime - currentTime
        duration = moment.duration(diffTime * 1000, 'milliseconds')
      }
    }, interval);
  }

  render() {

    const blackCardContainer = this.state.loadingBlackCard ?
      <LOADING> <i className="fa fa-circle-o-notch fa-spin"></i> Loading a crappy black card...</LOADING>:
      <ContainerBlackCard blackCard={this.state.blackCard} timeRemaining={this.state.timerDisplay}/>;

    const whiteCardContainer = this.state.loadingWhiteCards ?
      <LOADING><i className="fa fa-circle-o-notch fa-spin"></i> Loading people's lousy submissions... </LOADING>:
      <ContainerWhiteCards whiteCards={this.state.whiteCards}/>;

    return (
      <div>
        <ContainerRow>
          {blackCardContainer}
          {whiteCardContainer}
        </ContainerRow>
      </div>
    );
  }
}

function getRoundedTime() {
  return Math.floor(moment().unix() / blackCardTimeInterval) * blackCardTimeInterval
}

function random(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomInt(seed, min, max) {
  return Math.floor(random(seed) * (max - min + 1)) + min;
}

export default Home;
