
import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import logo from './logo.svg';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Rules from "./Rules";
import HallOfShame from "./HallOfShame";
import CreateCard from "./CreateCard";



class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <HashRouter>
      <div>

        <div className="topnav">
          <a href="#home"><h2>Crypto Against Humanity</h2></a>
          <a href="#home" ><NavLink to="/home">Play</NavLink></a>
          <a href="#rules"><NavLink to="/rules">The Rules</NavLink></a>
          <a href="#hall-of-shame"><NavLink to="/hall-of-shame">Hall of Shame</NavLink></a>
          <a href="#create-card"><NavLink to="/create-card">Create Card</NavLink></a>
        </div>

        <div className="content">
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route path="/rules" component={Rules}/>
            <Route path="/hall-of-shame" component={HallOfShame}/>
            <Route path="/create-card" component={CreateCard}/>
        </div>

      </div>
    </HashRouter>
    );
  }
}

export default App;
