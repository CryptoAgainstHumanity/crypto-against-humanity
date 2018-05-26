import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WhiteCardList from './components/white_card_list';
import WhiteCardListItem from './components/white_card_list_item';
import MenuBar from './components/menu_bar';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      whiteCards: [
        {text: "Vitalik", balance: 0.000, price: 0.000},
        {text: "Big black cock", balance: 0.000, price: 0.000},
        {text: "Webcam girls", balance: 0.000, price: 0.000},
      ],
      timeRemaining: null,

    };
  }

  render() {
    return (
    <div>

      <MenuBar />

      <div className="row current-round-page">

        <div className="column black-card-in-play">
          <h1 className="center"> Card in Play </h1>
          <div className="black-card center"> Black Card </div>
          <div className="time-left center">
            <p className="text"> TIME LEFT IN ROUND </p>
            <div className="clock"> CLOCK OBJECT </div>
          </div>
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
