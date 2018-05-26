import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WhiteCardList from './components/white_card_list';
import WhiteCardListItem from './components/white_card_list_item';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      whiteCards: ["vitalik", "Big Black Cock", "Something Else"]
    };
  }

  render() {
    return (

    <div class="row">
      <div class="column">
        <p class="center"> Black Card </p>
      </div>
      <div class="column">
        <h1> Buy your hand! </h1>
        <WhiteCardList whiteCards={this.state.whiteCards} class="center" />
      </div>
    </div>
    );
  }
}

export default App;
