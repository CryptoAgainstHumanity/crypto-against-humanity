import React, { Component } from "react";
import web3 from './web3';
import ReactGA from 'react-ga';
import whiteCardFactory from './web3Contracts/WhiteCardFactory';
import blackCardRegistry from './web3Contracts/BlackCardRegistry';
import nsfcCoinToken from './web3Contracts/NsfcCoinToken';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ipfsAPI from 'ipfs-api';
import Btn from './components/Button';
import Card from './components/Card';
import ContainerColumn from './components/ContainerColumn';
import styled from 'styled-components';
import {
  COLORS_OBJ, COLORS_TEXT, DARKEN, HAS_BORDER_RADIUS, HAS_SHADOW,
} from './StyleGuide';

class CreateCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      color: "white",
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
    const buffer = new Buffer(cardString) // This should be Buffer.from()
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
    if (this.state.color === "black") {
      this.setState({isVerified: true});
      await nsfcCoinToken.methods.approve(blackCardRegistry.options.address, 10).send({from: accounts[0]});
    } else {
      const cardString = this.getIpfsHash(this.state.value);
      const ipfsHash = await this.createIpfsHash(cardString)
      await whiteCardFactory.methods.addWhiteCard(ipfsHash).send({from: accounts[0]});
    }
  }

  render() {

    const cardFormControl = (this.state.color === 'black') ?
      <Card bigCard black><CardText onChange={this.handleTextChange.bind(this)} placeholder="Start typing here"/></Card>:
      <Card bigCard white><CardText onChange={this.handleTextChange.bind(this)} placeholder="Start typing here"/></Card>;

    const whiteCardSubmit = (
      <ContainerSubmit><Btn primary type="submit">Submit bad idea</Btn></ContainerSubmit>
      );

    const blackCardSubmit = (this.state.isVerified === true)?
      (<ContainerSubmit>
        <Btn type="submit">Verify you're worthy</Btn>
        <Btn primary onClick={this.submitBlackCard.bind(this)} type="submit">Submit bad idea</Btn>
      </ContainerSubmit>)
      :
      (<ContainerSubmit><Btn primary type="submit">Verify you're worthy</Btn></ContainerSubmit>);

    const cardSubmit = (this.state.color === "black")?
      blackCardSubmit:
      whiteCardSubmit;

    return (
      <ContainerMargins>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <ContainerToggle type="radio" name="options" data-toggle="buttons" onChange={this.handleColorChange.bind(this)} defaultValue={this.state.color}>
              <LblSelect white type="button"><input type="radio" name="options" autocomplete="off" value={"white"}/>White Card</LblSelect>
              <LblSelect black type="button"><input type="radio" name="options" autocomplete="off" value={"black"}/>Black Card</LblSelect>
            </ContainerToggle>

            {cardFormControl}
            {cardSubmit}
          </form>
      </ContainerMargins>
    );
  }
}

const ContainerMargins = ContainerColumn.extend`
  form>:not(:first-child) {
    margin-top: 16px;
  }
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
  font-size:16px;
  font-weight: bold;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  cursor: pointer;
  ${HAS_BORDER_RADIUS};
  ${HAS_SHADOW};

  background-color: ${props => props.white? 'white' : COLORS_OBJ.secondary.high};
  border: 2px solid ${props => props.white? 'white' : COLORS_OBJ.secondary.high};
  color: ${props => props.white? COLORS_TEXT.bgLight.high : COLORS_TEXT.bgDark.high};

  :hover {
    border-color: ${props => props.white? DARKEN('#ffffff') : DARKEN(COLORS_OBJ.secondary.high)};
    background-color: ${props => props.white? DARKEN('#ffffff') : DARKEN(COLORS_OBJ.secondary.high)};
    color: ${props => props.white? DARKEN(COLORS_OBJ.secondary.high) : DARKEN('#ffffff')};;
  }
`;

const CardText = styled.textarea`
  background-color: transparent;
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  outline: none;
`;

const ContainerSubmit = styled.div`
  display: flex;
  flex-direction: column;

  >:not(:first-child) {
    margin-top: 8px;
  }
`;

export default CreateCard;
