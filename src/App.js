import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import logo from './logo.svg';
import './App.css';
import WhiteCardList from './components/white_card_list';
import WhiteCardListItem from './components/white_card_list_item';
import MenuBar from './components/menu_bar';
import BlackCardDisplay from './components/black_card_display';




class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      whiteCards: [
        {text: "Vitalik", balance: 0.000, price: 0.000, color: "white-card"},
        {text: "Big black cock", balance: 0.000, price: 0.000, color: "white-card"},
        {text: "Webcam girls", balance: 0.000, price: 0.000, color: "white-card"},
      ],
      blackCard: {text: "I was offended by ___ at ETH Buenos Aires", color: "black-card", timeRemaining: "43"}
    };
  }

  render() {
    return (
    <div>

      <MenuBar />

      <div className="row current-round-page">

        <div className="column black-card-in-play">
          <BlackCardDisplay blackCard={this.state.blackCard} className="center" />
        </div>
        <div className="column white-cards-in-play">
          <h1 className="center"> Buy Your Hand! </h1>
          <WhiteCardList whiteCards={this.state.whiteCards} className="center" />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
