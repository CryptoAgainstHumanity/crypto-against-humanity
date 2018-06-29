import React, { Component } from "react";
import ReactGA from 'react-ga';
import styled from 'styled-components';
import web3 from './web3';
import Btn from './components/Button';
import ContainerApp from './components/ContainerApp';
import ContainerColumn from './components/ContainerColumn';
import {
  H1, H2, PARAGRAPH,
} from './StyleGuide';

class LandingPage extends Component {
  constructor(props) {
    super(props)
    ReactGA.initialize('UA-120470128-1');
    ReactGA.pageview(window.location.hash);
  }

  render() {
    const hasMetamask = this.props.hasMetamask;
    const network = this.props.network;
    var message = "Please Install MetaMask.";
    if (hasMetamask && network == "Unknown") {
      message = "Please Log Into MetaMask to play Crypto Against Humanity.";
    } else if (hasMetamask) {
      message = "Please Switch to the Ropsten Test Network, Your Current Network: " + network;
    }
    return (
      <ContainerApp>
      <ContainerColumn>

        <br/>

        <H1>Want to play?</H1>
        <PARAGRAPH>All you need is:</PARAGRAPH>
        <PARAGRAPH><b>MetaMask Browser Extension Installed</b></PARAGRAPH>
        <PARAGRAPH><b>MetaMask connected to the Ropsten Test network</b></PARAGRAPH>
        <PARAGRAPH><b>A lack of conscience</b></PARAGRAPH>
        <PARAGRAPH>Not competent to set this up yourself? We didn't have faith in you either so see below.</PARAGRAPH>

        <H2>Step 1: Installing MetaMask</H2>
        <PARAGRAPH>MetaMask is a digital wallet where you will store your money and which keeps tracks of your cards.</PARAGRAPH>
        <a href="https://MetaMask.io/">
            <Btn>Install MetaMask</Btn>
        </a>
        <PARAGRAPH>Note: Just like a bank account a digital wallet should be treated with respect. Make sure you don't forget your password and you store your seed words safely.</PARAGRAPH>
        <br/>

        <H2>Step 2: Connect to Ropsten network</H2>
        <PARAGRAPH>Currently Crypto Against Humanity is still in development and only available on a the Ropsten test network.</PARAGRAPH>
        <a href="https://cdn-images-1.medium.com/max/1600/1*k5aYGAd7CvRHO-o230nCPw.gif">
            <Btn>How to connect to Ropsten</Btn>
        </a>
        <PARAGRAPH>The good news for a cheapskate like you is that this means you can get the Eth you need to play for free!</PARAGRAPH>
        <a href="https://faucet.MetaMask.io/">
            <Btn>Free Ropsten Eth</Btn>
        </a>
        <br/>

        <H2>Step 3: Remove your conscience</H2>
        <PARAGRAPH>Wow you really thought this was a serious step? Ok I guess, go ahead.</PARAGRAPH>
        <a href="https://www.youtube.com/watch?v=1aPjGl-E-uY">
          <Btn>Remove your conscience</Btn>
        </a>
        <br/>

      </ContainerColumn>
      </ContainerApp>
    );
  }
}

export default LandingPage;