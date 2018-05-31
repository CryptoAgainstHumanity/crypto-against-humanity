import React, { Component } from "react";
import web3 from './web3';

class LandingPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const hasMetamask = this.props.hasMetamask;
    const network = this.props.network;
    var message = "Please Install Metamask.";
    if (hasMetamask && network == "Unknown") {
      message = "Please Log Into Metamask to play Crypto Against Humanity.";
    } else {
      message = "Please Switch to the Ropsten Test Network, Your Current Network: " + network;
    }
    return (
      <div>
        <div className="appContainer">
          <div className="header-1 centered-title">Want to play?</div>
          <div>
            All you need is:
            <ul>
              <li>Metamask Browser Extension Installed</li>
              <li>Metamask connected to the Ropsten Test network</li>
              <li>A lack of conscience</li>
            </ul>
            See below if you aren't comptent enough to do it yourself.
          </div>
          <div>
            <div className="header-1 centered-title">Step 1: Installing Metamask</div>
            Metamask is a digital wallet where you will store your money and which keeps tracks of your cards.
            <br/>
            <a href="https://metamask.io/">
              <button>Click here to install Metamask</button>
            </a>
            <br/>
            Note: Just like a bank account a digital wallet should be treated with respect. Make sure you don't forget your password and you store your seed words safely.
          </div>

          <div>
            <div className="header-1 centered-title">Step 2: Connect to Ropsten network</div>
            Currently Crypto Against Humanity is still in development and only available on a the Ropsten test network.
            The good news for a cheapskate like you is that this means you can get the Ether you need to play for free!
            <br/>
            <a href="https://blog.springrole.com/how-to-connect-metamask-to-the-ropsten-test-network-aef2810f1408">
              <button>Click here for instructions</button>
            </a>
            <br/>
            <a href="https://faucet.metamask.io/">
              <button>Click here for free Ropsten Ether</button>
            </a>
          </div>

          <div>
            <div className="header-1 centered-title">Step 3: Remove your conscience</div>
            Wow you really thought this was a serious step? Ok I guess, go ahead.
            <br/>
            <a href="https://www.quora.com/How-do-I-get-rid-of-my-conscience">
              <button>Click here to remove your conscience</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;