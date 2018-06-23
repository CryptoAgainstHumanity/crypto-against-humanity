import _ from 'lodash'
import moment from 'moment'
import web3 from './web3'
import React, { Component } from "react";
import ReactGA from 'react-ga';
import BlackCards from './data/blackCards.json'
import EventCache from './data/eventCache'
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
const IPFS_KEY = process.env.REACT_APP_IPFS_KEY;



class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingWhiteCards: true,
      loadingBlackCard: true,
      whiteCards: [],
      blackCard: {},
      originBlock: 3418530,
      TCRoriginBlock: 3317454,
      web3Id: 9999999,
      accounts: [1, 2, 3, 4, 5, 6, 7]
    };
    ReactGA.initialize('UA-120470128-1');
    ReactGA.pageview(window.location.hash);

    if (web3 != 'undefined') {
      web3.eth.net.getId((err, id) => {
          this.setState({
            web3Id: id
          })
      })
      web3.eth.getAccounts((err, accounts) => {
          this.setState({
            accounts: accounts
          })
      })
    } else {
      this.setState({
        web3Id: 'undefined'
      })
    }
  }



  componentWillMount() {
    this.setState({
        loadingWhiteCards: true
    })

    if (BlackCardRegistry != "undefined") {
      BlackCardRegistry.getPastEvents('_Application', {
        fromBlock: this.state.TCRoriginBlock,
        toBlock: 'latest'
      }, async (err, events) => {
        if (events.length == 0) {
          this.blackCards = BlackCards
        } else {
          this.blackCards = events
        }
        this.setBlackCard()
        this.startTimer()
      })
    } else {
      this.blackCards = BlackCards
      this.setBlackCard()
      this.startTimer()
    }

    var IPFSCardCache = []
    if (IPFS_KEY) {
      ipfs.files.read('/' + IPFS_KEY + '/eventCache.json', (err, buf) => {
        if (buf) {
          if (buf.toString('utf8') != '') {
            IPFSCardCache = JSON.parse(buf.toString('utf8'))
            this.getWhiteCardInfo(IPFSCardCache)
          } else {
            this.loadWhiteCardsFromContract();
            console.error("IPFS file is corrupted")
          }
        } else {
          this.loadWhiteCardsFromContract();
          console.error("Could not find IPFS file")
        }
      });
    } else {
      this.loadWhiteCardsFromContract();
      console.error("MISSING A VALID IPFS KEY")
    }


  }

  async getWhiteCardInfo(cardEvents) {

    const whiteCardTokenUnits = 10 ** 12 * 10 ** 18
    const defaultTokenBuyAmount = 0.001 * 10 ** 18

    var whiteCards = []
    for (var i = 0; i < cardEvents.CreateEvents.length; i++) {
      whiteCards.push({
        text: cardEvents.CreateEvents[i].text,
        bondingCurveAddress: cardEvents.CreateEvents[i].tokenAddress,
        blockNum: cardEvents.CreateEvents[i].blockNumber
      })
    }

    var cardsWithInfo = []
    var updatedCards = []
    var accounts = "";
    if (web3 != 'undefined') {
      var networkId = await web3.eth.net.getId();
      if (networkId == 3) { //if ropsten
        accounts = await web3.eth.getAccounts();
      }
    }
    for (var i = 0; i < whiteCards.length; i++) {
      var tokenBalance = 0;
      var poolBalance = 0;
      var totalSupply = 0;
      for (var j = 0; j < cardEvents.MintBurnEvents.length; j++) {
        if (cardEvents.MintBurnEvents[j].tokenAddress == whiteCards[i].bondingCurveAddress) {
          if (cardEvents.MintBurnEvents[j].caller == accounts[0]) {
            if (cardEvents.MintBurnEvents[j].type == "Minted") {
              tokenBalance += precisionRound((cardEvents.MintBurnEvents[j].amount / whiteCardTokenUnits) * 10 ** 4 * 10 ** 18, 3);
              poolBalance += Number(cardEvents.MintBurnEvents[j].costReward)
              totalSupply += Number(cardEvents.MintBurnEvents[j].amount)
            } else {
              tokenBalance -= precisionRound((cardEvents.MintBurnEvents[j].amount / whiteCardTokenUnits) * 10 ** 4 * 10 ** 18, 3);
              poolBalance -= Number(cardEvents.MintBurnEvents[j].costReward)
              totalSupply -= Number(cardEvents.MintBurnEvents[j].amount)
            }
          } else {
            if (cardEvents.MintBurnEvents[j].type == "Minted") {
              poolBalance += Number(cardEvents.MintBurnEvents[j].costReward)
              totalSupply += Number(cardEvents.MintBurnEvents[j].amount)
            } else {
              poolBalance -= Number(cardEvents.MintBurnEvents[j].costReward)
              totalSupply -= Number(cardEvents.MintBurnEvents[j].amount)
            }
          }
        }
      }

    // let tokenVal = 1 * tokenUnits //10 ** 8
    // EthPolynomialCurveToken.options.address = this.props.bondingCurveAddress
    // let bondingCurvePrice = await EthPolynomialCurveToken.methods
    //   .getMintingPrice(tokenVal).call()
    // this.setState({
    //   price: bondingCurvePrice / 10 ** 18
    // })


      var a = Number(totalSupply) + Number(10 ** 8)
      var b = Number(poolBalance)
      var step1 = 10000000000 / 2
      var step2 = step1 * (a**2)
      var step3 = step2 / 10000000000
      var cardMintingPrice = step3 - b
      var cardPrice = (cardMintingPrice / 10 ** 18);

      var text = whiteCards[i].text;
      cardsWithInfo.push({
        text: text.replace(/[\x00-\x1F\x7F-\x9F]/g, ''),
        bondingCurveAddress: whiteCards[i].bondingCurveAddress,
        blockNum: whiteCards[i].blockNum,
        balance: tokenBalance,
        price: cardPrice,
        totalSupply: totalSupply,
        poolBalance: poolBalance
      })

    }

    // Order by price
    updatedCards = _.orderBy(cardsWithInfo, ['price'], ['desc']); 

    // Order by newest
    //updatedCards = _.orderBy(cardsWithInfo, ['blockNum'], ['desc']); 
    this.setState({
      whiteCards: updatedCards,
      loadingWhiteCards: false
    })
  }

  loadWhiteCardsFromContract (){
    var whiteCardTokenUnits = 10 ** 12 * 10 ** 18
    var defaultTokenBuyAmount = 0.001 * 10 ** 18
      WhiteCardFactory.getPastEvents('_WhiteCardCreated', {
      fromBlock: this.state.originBlock,
      toBlock: 'latest'
    }, async (err, events) => {
      console.log("Loading " + events.length + " White Cards..")
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
        console.log("Loading a White Card...")
        var playerBalance = precisionRound((bondingCurveBalance / whiteCardTokenUnits) * 10 ** 4 * 10 ** 18, 3)
        whiteCards.push({
          text,
          bondingCurveAddress: bondingCurveAddress,
          totalBalance: parseInt(bondingCurveTotalBalance),
          balance: playerBalance,
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

    var doDisplayMessage = false;
    var displayMessage = ''
    if (web3 == 'undefined') {
      doDisplayMessage = true;
      displayMessage = "You don't have Metamask and will be unable to interact with the site!"
    } else if (this.state.web3Id != 3 && this.state.web3Id != 9999999) {
      doDisplayMessage = true;
      displayMessage = "You need to switch to the ropsten test network to interact with the site!"
    } else if (this.state.accounts.length == 0) {
      doDisplayMessage = true;
      displayMessage = "You need to log into metamask to interact with the site!"
    }
    //var statusMessage = 
    var status = doDisplayMessage ?
    <div class="alert alert-info" role="alert" > {displayMessage} </div> :
    <div></div>;

    return (
      <div>
        {status}
        <ContainerRow>
          {blackCardContainer}
          {whiteCardContainer}
        </ContainerRow>
      </div>
    );
  }
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
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
