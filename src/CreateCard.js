import React, { Component } from "react";
import web3 from './web3';
import sha256 from 'sha256';
import ReactGA from 'react-ga';
import bytes from 'bytes';
import {
  Button,
  FormGroup, ButtonToolbar,
  FormControl, InputGroup, ControlLabel,
  ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import whiteCardFactory from './web3Contracts/WhiteCardFactory';
import blackCardRegistry from './web3Contracts/BlackCardRegistry';
import nsfcCoinToken from './web3Contracts/NsfcCoinToken';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ipfsAPI from 'ipfs-api'

class CreateCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      color: "black",
      isVerified: false
    };
    ReactGA.initialize('UA-120470128-1');
    ReactGA.pageview(window.location.hash);
  }

  onSubmit = async (event) => {
     this.setState({value: event.target.value});
  }

  handleTextChange(e) {
    this.setState({value: e.target.value});
  }

  handleColorChange(e) {
    this.setState({color: e})
  }

  getIpfsHash(content){
    return content;
  }

  submitBlackCard = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const cardString = this.getIpfsHash(this.state.value);
    const ipfsHash = await this.createIpfsHash(cardString)
    const ipfsSha = web3.utils.sha3(ipfsHash, { encoding: 'hex' })
    await blackCardRegistry.methods.apply(ipfsSha, 10, ipfsHash).send({from: accounts[0]});
  }

  createIpfsHash = async (cardString) => {
    console.log('createIpfsHash!')
    const buffer = new Buffer(cardString)
    const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
    const hash = await ipfs.add(buffer)
    return hash[0].hash
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const cardValue = this.state.value;
    const colorValue = this.state.color;
    ReactGA.event({
        category: 'Creating Card',
        action: colorValue +" card, text: " + cardValue,
    });

    const accounts = await web3.eth.getAccounts();
    if (this.state.color == "black") {
      this.setState({isVerified: true});
      await nsfcCoinToken.methods.approve(blackCardRegistry.options.address, 10).send({from: accounts[0]});
    } else {
      const cardString = this.getIpfsHash(this.state.value);
      const ipfsHash = await this.createIpfsHash(cardString)
      await whiteCardFactory.methods.addWhiteCard(ipfsHash).send({from: accounts[0]});
    }
  }

  render() {

    const styleToggleBlack = {
      height: '40px',
      width:'152px',
      borderRadius: '4px',
      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: 'bold',

      backgroundColor: '#323639',
      color: 'white',
    }

    const styleToggleWhite = {
      height: '40px',
      width:'152px',
      borderRadius: '4px',
      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: 'bold',

      backgroundColor: 'white',
      color: '#323639',
      marginLeft: '16px',
    }

    const styleCard = {
      height: '400px',
      width: '320px',
      resize: 'none',
      zid: '9999',

      borderRadius: '4px',
      boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)',

      fontSize: '32px',
      padding: '20px',
    }

    if (this.state.color === 'black') {
      styleCard.backgroundColor = '#323639';
      styleCard.color = 'white';
    } else {
      styleCard.backgroundColor = 'white';
      styleCard.color = '#323639';
    }

    const StyleGuideubmit = {
      width: '320px',
      height: '40px',

      borderRadius: '4px',
      backgroundColor: '#d94a4d',
      boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)',

      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
    }

    // <div className="create-card-background"></div>

    return (
      <div>
        <div>
          <div className="header-1 create-card-title">Create Card</div>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <ButtonToolbar className="create-card-toggle" >
              <ToggleButtonGroup type="radio" name="options" onChange={this.handleColorChange.bind(this)} defaultValue={this.state.color}>
                <ToggleButton value={"black"} style={styleToggleBlack}>Black Card</ToggleButton>
                <ToggleButton value={"white"} style={styleToggleWhite}>White Card</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>

            <FormGroup controlId="formControlsTextarea">
              <FormControl
                onChange={this.handleTextChange.bind(this)}
                componentClass="textarea"
                placeholder="Start typing here"
                style={styleCard}
              />
            </FormGroup>

            <div><b>{this.state.color == "white" ? <Button className= "primary-button" type="submit" style={StyleGuideubmit}>Submit</Button> :
                                                  <Button className= "primary-button" type="submit" style={StyleGuideubmit}>Get Verified</Button>}</b></div>

            <div><b>{this.state.isVerified == true && this.state.color == "black" ? <Button onClick={this.submitBlackCard.bind(this)} type="submit" style={StyleGuideubmit}>Submit</Button> : <div></div>}</b></div>
            <div><b>{this.state.isVerified == true && this.state.color == "black" ? <p>*Ensure you wait until last transaction succeeded before submitting*</p> : <div></div>} </b></div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCard;
