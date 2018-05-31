import React, { Component } from "react";

class LandingPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const hasMetamask = this.props.hasMetamask;
    console.log(hasMetamask);
    var message = "Please Install Metamask.";
    if (hasMetamask) {
      message = "Please Log Into Metamask, and Use the Ropsten Testnet."
    }
    return (
      <div>
        <div className="header-1 centered-title">{message}</div>
      </div>
    );
  }
}

export default LandingPage;