import React, { Component } from "react";
import web3 from './web3';

class LandingPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const hasMetaMask = this.props.hasMetaMask;
    const network = this.props.network;
    var message = "Please Install MetaMask.";
    if (hasMetaMask && network == "Unknown") {
      message = "Please Log Into MetaMask to play Crypto Against Humanity.";
    } else {
      message = "Please Switch to the Ropsten Test Network, Your Current Network: " + network;
    }
    return (
      <div>
        <div className="flex-box-container">
        <div className="limited-width">

          <div className="header-1 centered-title">Want to play?</div>
          <div className="lbl-text margin-text centered-text">
            All you need is:
            <br/><br/>
              MetaMask Browser Extension Installed<br/>
              MetaMask connected to the Ropsten Test network<br/>
              A lack of conscience<br/>
            <br/>
            In case you aren't comptent enough to do it yourself see below.


          <div>
            <div className="header-2 centered-title">Step 1: Installing MetaMask</div>
            <br/>
            MetaMask is a digital wallet where you will store your money and which keeps tracks of your cards.
            <br/>
            <a href="https://MetaMask.io/">
              <button className="primary-button">Click here to install MetaMask</button>
            </a>
            <br/>
            <br/>
            Note: Just like a bank account a digital wallet should be treated with respect. Make sure you don't forget your password and you store your seed words safely.
          </div>

          <div>
            <div className="header-2 centered-title">Step 2: Connect to Ropsten network</div>
            <br/>
            Currently Crypto Against Humanity is still in development and only available on a the Ropsten test network.
            The good news for a cheapskate like you is that this means you can get the Ether you need to play for free!
            <br/>
            <a href="https://blog.springrole.com/how-to-connect-MetaMask-to-the-ropsten-test-network-aef2810f1408">
              <button className="primary-button">Click here for instructions</button>
            </a>
            <br/>
            <a href="https://faucet.MetaMask.io/">
              <button className="primary-button">Click here for free Ropsten Ether</button>
            </a>
          </div>

          <div>
            <div className="header-2 centered-title">Step 3: Remove your conscience</div>
            <br/>
            Wow you really thought this was a serious step? Ok I guess, go ahead.
            <br/>
            <a href="https://www.quora.com/How-do-I-get-rid-of-my-conscience">
              <button className="primary-button">Click here to remove your conscience</button>
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