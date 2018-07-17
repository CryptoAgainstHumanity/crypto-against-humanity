import React, { Component } from "react";
import web3 from './web3'
import _ from 'lodash'
import ipfsAPI from 'ipfs-api';
import Btn from './components/Button';
import WhiteCardFactory from './web3Contracts/WhiteCardFactory'
import WhiteCard from './web3Contracts/WhiteCard'
import EthPolynomialCurveToken from './web3Contracts/EthPolynomialCurveToken'

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
const IPFS_KEY = process.env.REACT_APP_IPFS_KEY;

class UpdateCache extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingWhiteCards: true,
      loadingBlackCard: true,
      whiteCards: [],
      blackCard: {},
      originBlock: 3418530,
      TCRoriginBlock: 3317454
    };
    localStorage.clear();
    this.editFile = this.editFile.bind(this);
    this.showFile = this.showFile.bind(this);
    this.makeDir = this.makeDir.bind(this);
    this.createFile = this.createFile.bind(this);
    this.statFileToPin = this.statFileToPin.bind(this);
    this.loadWhiteCards = this.loadWhiteCards.bind(this);
  }

  async editFile (fileName, content) {
    console.log("Updating Cache")
    ipfs.files.write('/' + IPFS_KEY + '/' + fileName , Buffer.from(content), {create:true, truncate:true}, (err) => {
      console.log(err)
      this.statFileToPin(fileName)
      this.statFileToPin("");
    })
  }

  async showFile (event) {
    console.log("Showing file")
    ipfs.files.read('/' + IPFS_KEY + '/eventCache.json', (err, buf) => {
      console.log(buf.toString('utf8'))
    })
    event.preventDefault();
  }

  async pinFile (hash) {
    ipfs.pin.add(hash, function (err) {
      if (!err) {
        console.log("pinned directory");
      }
    })
  }

  async createFile(name) {
    ipfs.files.write('/' + IPFS_KEY + '/' + name, Buffer.from('Hello, world!'), {create:true, truncate:true}, (err) => {
      console.log(err)
      console.log("created " + name)
      this.statFileToPin(name)
    })
  }

  async statFileToPin(name) {
    ipfs.files.stat('/' + IPFS_KEY + '/' + name, (err, stats) => {
      if (!err){
        console.log(stats.hash)
        this.pinFile(stats.hash)
      }
    })
  }

  async makeDir() {
    ipfs.files.mkdir('/' + IPFS_KEY, {parents:true}, (err) => {
      if (err) {
        console.error(err)
      }
      this.createFile("cachedCards.json")
      this.createFile("cachedBlock.json")
      this.pinFile("");
      console.log("directory made");
    })
  }

  async loadWhiteCards() {
    const whiteCardTokenUnits = 10 ** 12 * 10 ** 18
    const defaultTokenBuyAmount = 0.001 * 10 ** 18
    const accounts = await web3.eth.getAccounts()

    WhiteCardFactory.getPastEvents('_WhiteCardCreated', {
      fromBlock: 0,
      toBlock: 'latest'
    }, async (err, events) => {
      let newBlockNum = await web3.eth.getBlock('latest');
      let whiteCards = []
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
        let bondingCurveTotalSupply = await EthPolynomialCurveToken.methods.totalSupply().call(); 
        let bondingCurvePoolBalance = await EthPolynomialCurveToken.methods.poolBalance().call();

        whiteCards.push({
          text,
          bondingCurveAddress: bondingCurveAddress,
          balance: bondingCurveBalance / whiteCardTokenUnits,
          price: bondingCurvePrice / whiteCardTokenUnits,
          totalSupply: bondingCurveTotalSupply,
          poolBalance: bondingCurvePoolBalance,
          color: "white-card"
        })
        console.log("Updating All Cards");
      }
      console.log("Done");
      whiteCards = _.orderBy(whiteCards, ['price'], ['desc'])
      this.editFile("cachedCards.json", JSON.stringify(whiteCards));
      this.editFile("cachedBlock.json", JSON.stringify(newBlockNum.number));
    })
  }

  render() {
        
        //
        // <Btn primary onClick={this.createFile}>Create IPFS File</Btn>
        // <Btn primary onClick={this.editFile}>Change File Content</Btn>
        // <Btn primary onClick={this.showFile}>Show File Content</Btn>
        // <Btn primary onClick={this.makeDir}>Make IPFS Dir</Btn>
        //<Btn primary onClick={this.loadWhiteCards}>Update Cache</Btn>

    return (
      <div>
        <Btn primary onClick={this.showFile}>Show Card Cache</Btn>
      </div>
    );
  }
}

export default UpdateCache;