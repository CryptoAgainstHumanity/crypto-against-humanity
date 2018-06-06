import React, { Component } from "react";
import ReactGA from 'react-ga';
import kyle from'./imgs/kyle.jpeg';
import emily from'./imgs/emily.jpeg';
import felix from'./imgs/felix.jpeg';
import mike from'./imgs/mike.jpeg';
import Card from './components/contact_card';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';


class AboutUs extends Component {
    constructor(props) {
        super(props);
        ReactGA.initialize('UA-120470128-1');
        ReactGA.pageview(window.location.hash);
    }

  render() {

    return (
      <div className="rules-div">
        <ul className="white-card-list">
        <div className="header-1 centered-title">About Us</div>
        <p> Crypto Against Humanity was birthed out of 36 hours without sleep, 4 dedicated teammates, and the legendary ETH Buenos Aires Hackathon. 
        Crypto Against Humanity was honored as a winner, and the humanity deteriorated from there. Our team is working hard to bring bad behavior to the 
        Ethereum blockchain. We hope you enjoy Crypto Against Humanity as much as we enjoyed creating it.</p>
        <div className="header-2 centered-title">Founders</div>
            <li className="white-card-row">
                <div className="white-card">
                    <Card text="Kyle Bryant" color="white-card" image={kyle}/>
                </div>
                <div className="left-side"> 
                    <p> Kyle is a Solidity/Web3 Developer based out of Boston. His passion for game development and software has finally found a focal point. 
                    Kyle studied Interactive Media and Game Development at Worcester Polytechnic Institute and worked as a Java developer for Amazon Robotics 
                    and Hitachi Vantara after university.</p>
                    <ul>
                        <li><a href="https://twitter.com/komodoman" class="fa fa-twitter" /></li>
                        <li><a href="https://www.linkedin.com/in/kyle-c-bryant/" class="fa fa-linkedin"/></li>
                        <li><a href="https://github.com/Kyrrui" class="fa fa-github"/></li>
                        <li><a href="https://medium.com/@kylebryant_28277" class="fa fa-medium"/></li>
                    </ul>
                </div>
            </li>
            <li className="white-card-row">
                <div className="white-card">
                    <Card text="Emily Williams" color="white-card" image={emily}/>
                </div>
                <div className="left-side"> 
                    <p> A little bit about me </p>
                </div>
            </li>
            <li className="white-card-row">
                <div className="white-card">
                    <Card text="Felix Kramer" color="white-card" image={felix}/>
                </div>
                <div className="left-side"> 
                    <p> A little bit about me </p>
                </div>
            </li>
            <li className="white-card-row">
                <div className="white-card">
                    <Card text="Mike Calvanese" color="white-card" image={mike}/>
                </div>
                <div className="left-side"> 
                    <p> A little bit about me </p>
                </div>
            </li>
        </ul>   
      </div>
    );
  }
}

export default AboutUs;