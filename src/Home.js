import _ from 'lodash'
import moment from 'moment'
import web3 from './web3'
import React, { Component } from "react";
import ReactGA from 'react-ga';
import BlackCards from './data/blackCards.json'
import EventCache from './data/eventCache.json'
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
import HeaderNotification from './components/HeaderNotification';
import { GetBuyPrice, PrecisionRound, GetRandomInt } from './Utilities'



const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
const blackCardTimeInterval = 86400 // seconds -> 24 hours
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
      accounts: [1, 2, 3, 4, 5, 6, 7],
      ipfsDown: false,
      isInteractive: true,
    };
    ReactGA.initialize('UA-120470128-1');
    ReactGA.pageview(window.location.hash);

    if (web3 !== 'undefined') {
      web3.eth.net.getId((err, id) => {
          this.setState({web3Id: id})
          if (id !== 3) {
            this.setState({isInteractive: false})
          }
      })
      web3.eth.getAccounts((err, accounts) => {
          this.setState({accounts: accounts})
      })
    } else {
      this.setState({
        web3Id: 'undefined',
        isInteractive: false,
      })
    }
  }

  componentWillMount() {
    this.setState({
        loadingWhiteCards: true
    })

    if (BlackCardRegistry !== "undefined") {
      BlackCardRegistry.getPastEvents('_Application', {
        fromBlock: this.state.TCRoriginBlock,
        toBlock: 'latest'
      }, async (err, events) => {
        if (events.length === 0) {
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
          if (buf.toString('utf8') !== '') {
            IPFSCardCache = JSON.parse(buf.toString('utf8'))
            this.getWhiteCardInfo(IPFSCardCache)
          } else {
            this.setState({
              ipfsDown: true,
              isInteractive: false,
            })
            this.getWhiteCardInfo(EventCache)
            console.error("IPFS file is corrupted")
          }
        } else {
          this.setState({
            ipfsDown: true,
            isInteractive: false,
          })
          this.getWhiteCardInfo(EventCache)
          console.error("Could not find IPFS file")
        }
      });
    } else {
      this.setState({
        ipfsDown: true,
        isInteractive: false,
      })
      this.getWhiteCardInfo(EventCache)
      console.error("MISSING A VALID IPFS KEY")
    }


  }

  async getWhiteCardInfo(cardEvents) {

    const whiteCardTokenUnits = 10 ** 12 * 10 ** 18

    // Remove Duplicate Events
    const mintBurnEvents = uniqBy(cardEvents.MintBurnEvents, JSON.stringify)
    const createEvents = uniqBy(cardEvents.CreateEvents, JSON.stringify)

    var whiteCards = []
    for (var h = 0; h < createEvents.length; h++) {
      whiteCards.push({
        text: createEvents[h].text,
        bondingCurveAddress: createEvents[h].tokenAddress,
        blockNum: createEvents[h].blockNumber
      })
    }

    var cardsWithInfo = []
    var updatedCards = []
    var accounts = "";
    if (web3 !== 'undefined') {
      var networkId = await web3.eth.net.getId();
      if (networkId === 3) { //if ropsten
        accounts = await web3.eth.getAccounts();
      }
    }
    for (var i = 0; i < whiteCards.length; i++) {
      var tokenBalance = 0;
      var poolBalance = 0;
      var totalSupply = 0;
      var events = [];
      for (var j = 0; j < mintBurnEvents.length; j++) {
        if (mintBurnEvents[j].tokenAddress === whiteCards[i].bondingCurveAddress) {
          if (mintBurnEvents[j].caller === accounts[0]) {
            if (mintBurnEvents[j].type === "Minted") {
              tokenBalance += PrecisionRound((mintBurnEvents[j].amount / whiteCardTokenUnits) * 10 ** 4 * 10 ** 18, 3);
            } else {
              tokenBalance -= PrecisionRound((mintBurnEvents[j].amount / whiteCardTokenUnits) * 10 ** 4 * 10 ** 18, 3);
            }
          }
          if (mintBurnEvents[j].type === "Minted") {
            poolBalance += Number(mintBurnEvents[j].costReward)
            totalSupply += Number(mintBurnEvents[j].amount)
          } else {
            poolBalance -= Number(mintBurnEvents[j].costReward)
            totalSupply -= Number(mintBurnEvents[j].amount)
          }
          events.push({
            price: GetBuyPrice(totalSupply, poolBalance),
            blockNum: mintBurnEvents[j].blockNumber
          })
        }
      }

      var text = whiteCards[i].text;
      cardsWithInfo.push({
        text: text.replace(/[\x00-\x1F\x7F-\x9F]/g, ''),
        bondingCurveAddress: whiteCards[i].bondingCurveAddress,
        blockNum: whiteCards[i].blockNum,
        balance: tokenBalance,
        price: GetBuyPrice(totalSupply, poolBalance),
        totalSupply: totalSupply,
        poolBalance: poolBalance,
        events: events
      })

    }

    // Order by price
    updatedCards = _.orderBy(cardsWithInfo, ['price'], ['desc']);

    this.setState({
      whiteCards: updatedCards,
      loadingWhiteCards: false
    })
  }

  loadWhiteCardsFromContract (){
    var whiteCardTokenUnits = 10 ** 12 * 10 ** 18
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
        //let bondingCurvePrice = await EthPolynomialCurveToken.methods.getMintingPrice(defaultTokenBuyAmount).call()
        let bondingCurvePrice = await EthPolynomialCurveToken.methods.getMintingPrice(10 ** 8).call()
        let bondingCurveBalance = await EthPolynomialCurveToken.methods.balanceOf(accounts[0]).call()
        let bondingCurveTotalBalance = await web3.eth.getBalance(bondingCurveAddress)
        console.log("Loading a White Card...")
        var playerBalance = PrecisionRound((bondingCurveBalance / whiteCardTokenUnits) * 10 ** 4 * 10 ** 18, 3)
        whiteCards.push({
          text,
          blockNum: events[i].blockNumber,
          bondingCurveAddress: bondingCurveAddress,
          totalBalance: parseInt(bondingCurveTotalBalance, 10),
          balance: playerBalance,
          price: bondingCurvePrice / 10 ** 18,
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
    const i = GetRandomInt(roundedTime, 0, this.blackCards.length - 1)
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
      <ContainerWhiteCards whiteCards={this.state.whiteCards} isInteractive={this.state.isInteractive}/>;

    var doDisplayMessage = false;
    var displayMessage = ''
    if (web3 === 'undefined') {
      doDisplayMessage = true;
      displayMessage = "You don't have Metamask and will be unable to interact with the site!"
    } else if (this.state.web3Id !== 3 && this.state.web3Id !== 9999999) {
      doDisplayMessage = true;
      displayMessage = "You need to switch to the Ropsten test network to interact with the site!"
    } else if (this.state.accounts.length === 0) {
      doDisplayMessage = true;
      displayMessage = "You need to log into Metamask to interact with the site!"
    } else if (this.state.ipfsDown) {
      doDisplayMessage = true;
      displayMessage = "Our IPFS cache is down! All content on the site is stale. This will be fixed shortly."
    }
    var headerNotification = doDisplayMessage ?
    (<HeaderNotification role="alert" >
      <p>{displayMessage} For more information, <a href="/#/landing-page">click here.</a></p>
    </HeaderNotification>) :
    <div></div>;
    return (
      <div>
        {headerNotification}
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

function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}




export default Home;
