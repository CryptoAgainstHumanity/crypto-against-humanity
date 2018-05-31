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
        <div className="header-1 centered-title">{message}</div>
      </div>
    );
  }
}

export default LandingPage;