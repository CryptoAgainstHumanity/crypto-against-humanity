import React, { Component } from "react";
import web3 from './web3';
import sha256 from 'sha256';
import ReactGA from 'react-ga';
import bytes from 'bytes';
import {
  Button,
  FormGroup, ButtonToolbar,
  FormControl, InputGroup, ControlLabel,
  ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import whiteCardFactory from './web3Contracts/WhiteCardFactory';
import blackCardRegistry from './web3Contracts/BlackCardRegistry';
import nsfcCoinToken from './web3Contracts/NsfcCoinToken';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ipfsAPI from 'ipfs-api';
import Btn from './components/Button';
import styled from 'styled-components';
import {
  COLORS_OBJ, COLORS_TEXT, DARKEN, HAS_BORDER_RADIUS,
} from './StyleGuide';

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
    this.setState({color: e.target.value});
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

    // <div className="create-card-background"></div>

    // <ToggleButton value={"black"}>Black Card</ToggleButton>
    // <ToggleButton value={"white"}>White Card</ToggleButton>

    return (
      <ContainerContent>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <ContainerToggle type="radio" name="options" data-toggle="buttons" onChange={this.handleColorChange.bind(this)} defaultValue={this.state.color}>
              <LblSelect black type="button"><input type="radio" name="options" autocomplete="off" value={"black"}/>Black Card</LblSelect>
              <LblSelect white type="button"><input type="radio" name="options" autocomplete="off" value={"white"}/>White Card</LblSelect>
            </ContainerToggle>

            <FormGroup controlId="formControlsTextarea">
              <FormControl
                onChange={this.handleTextChange.bind(this)}
                componentClass="textarea"
                placeholder="Start typing here"
                style={styleCard}
              />
            </FormGroup>

            <div><b>{this.state.color == "white" ? <Btn primary type="submit">Submit bad idea</Btn> :
                                                  <Btn primary type="submit">Get Verified</Btn>}</b></div>

            <div><b>{this.state.isVerified == true && this.state.color == "black" ? <Btn primary onClick={this.submitBlackCard.bind(this)} type="submit">Submit bad idea</Btn> : <div></div>}</b></div>
            <div><b>{this.state.isVerified == true && this.state.color == "black" ? <p>*Ensure you wait until last transaction succeeded before submitting*</p> : <div></div>} </b></div>
          </form>
        </div>
      </ContainerContent>
    );
  }
}

const ContainerContent = styled.div`
  width: 880px;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: red;
`;

const ContainerToggle = styled.div`
  display: flex;

  label {
    flex: 1 0 auto;
    text-align: center;
  }

  >label:nth-child(1) {
    margin-right: 16px;
  }

  input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
`;

const LblSelect = styled.label`
  padding: 0.5em 1em;
  ${HAS_BORDER_RADIUS};
  font-size:16px;
  font-weight: bold;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  cursor: pointer;

  background-color: ${props => props.white? 'white' : COLORS_OBJ.secondary.high};
  border: 2px solid ${props => props.white? 'white' : COLORS_OBJ.secondary.high};
  color: ${props => props.white? COLORS_TEXT.bgLight.high : COLORS_TEXT.bgDark.high};

  :hover {
    border-color: ${props => props.white? DARKEN('#ffffff') : DARKEN(COLORS_OBJ.secondary.high)};
    background-color: ${props => props.white? DARKEN('#ffffff') : DARKEN(COLORS_OBJ.secondary.high)};
    color: ${props => props.white? DARKEN(COLORS_OBJ.secondary.high) : DARKEN('#ffffff')};;
  }
`;

export default CreateCard;
