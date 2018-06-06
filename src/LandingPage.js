import React, { Component } from "react";
import ReactGA from 'react-ga';
import web3 from './web3';

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
      <div>
        <div className="flex-box-container">
        <div className="limited-width">

          <div className="header-1 centered-title">{message}</div>
          <div className="header-2 centered-title">Want to play?</div>
          <div className="lbl-text margin-text centered-text">
            All you need is:
            <br/><br/>
             <b>MetaMask Browser Extension Installed</b>
             <br/><br/>
              <b>MetaMask connected to the Ropsten Test network</b>
              <br/><br/>
              <b>A lack of conscience</b>
              <br/><br/>
            <br/>
            Not competent to set this up yourself? We didn't have faith in you either so see below.


          <div>
            <div className="header-2 centered-title">Step 1: Installing MetaMask</div>
            <br/>
            MetaMask is a digital wallet where you will store your money and which keeps tracks of your cards.
            <br/>
            <a href="https://MetaMask.io/">
              <button className="primary-button">Install MetaMask</button>
            </a>
            <br/>
            <br/>
            Note: Just like a bank account a digital wallet should be treated with respect. Make sure you don't forget your password and you store your seed words safely.
          </div>

          <div>
            <div className="header-2 centered-title">Step 2: Connect to Ropsten network</div>
            <br/>
            Currently Crypto Against Humanity is still in development and only available on a the Ropsten test network.
            <br/>
            <a href="https://cdn-images-1.medium.com/max/1600/1*k5aYGAd7CvRHO-o230nCPw.gif">
              <button className="primary-button">How to connect to Ropsten</button>
            </a>
            <br/><br/>
            The good news for a cheapskate like you is that this means you can get the Ether you need to play for free!
            <br/>
            <a href="https://faucet.MetaMask.io/">
              <button className="primary-button">Free Ropsten Ether</button>
            </a>
          </div>

          <div>
            <div className="header-2 centered-title">Step 3: Remove your conscience</div>
            <br/>
            Wow you really thought this was a serious step? Ok I guess, go ahead.
            <br/>
            <a href="https://www.youtube.com/watch?v=1aPjGl-E-uY">
              <button className="primary-button">Remove your conscience</button>
            </a>
            <br/>
            <br/>
          </div>
        </div>

        </div>

        </div>
      </div>
    );
  }
}

export default LandingPage;