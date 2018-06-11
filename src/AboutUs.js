import React, { Component } from "react";
import ReactGA from 'react-ga';
import styled from 'styled-components'
import imgKyle from'./imgs/kyle.jpeg';
import imgEmily from'./imgs/emily.jpeg';
import imgFelix from'./imgs/felix.jpeg';
import imgMike from'./imgs/mike.jpeg';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Card from './components/Card';
import ContainerColumn from './components/ContainerColumn';
import {
  H1, H4, PARAGRAPH,
} from './StyleGuide';


class AboutUs extends Component {
    constructor(props) {
        super(props);
        ReactGA.initialize('UA-120470128-1');
        ReactGA.pageview(window.location.hash);
    }

  render() {

    return (
      <ContainerColumn>
        <H1>About Us</H1>
        <PARAGRAPH>Crypto Against Humanity was birthed out of 36 caffeine-fueled hours without sleep, 4 dedicated teammates, and the legendary ETH Buenos Aires Hackathon.
        Our team is working hard to bring bad behavior to the Ethereum blockchain.</PARAGRAPH>
        <PARAGRAPH>We hope you enjoy Crypto Against Humanity as much as we enjoyed creating it.</PARAGRAPH>
        <PARAGRAPH>To suggest ideas on how to accelerate our plan for world destruction contact us at <a href="mailto:Inquiries@CryptoAgainstHumanity.io">Inquiries@CryptoAgainstHumanity.io</a>.</PARAGRAPH>
        <PARAGRAPH>If you're feeling lonely follow us on Twitter, Github or Medium!</PARAGRAPH>
        <SocialLinks big>
            <li><a href="https://twitter.com/CryptoVHumanity"><i class="fa fa-twitter"></i></a></li>
            <li><a href="https://github.com/CryptoAgainstHumanity"><i class="fa fa-github"></i></a></li>
            <li><a href="https://medium.com/crypto-against-humanity"><i class="fa fa-medium"></i></a></li>
        </SocialLinks>

        <TeamContainer>
            <SocialCard>
                <ImageContainer><img src={imgEmily} alt="Emily Williams"/></ImageContainer>
                <H4>Emily Williams</H4>
                <SocialLinks>
                    <li><a href="https://twitter.com/crypt0glitter"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/ecwilliams66/"><i class="fa fa-linkedin"></i></a></li>
                    <li><a href="https://github.com/emaG3m"><i class="fa fa-github"></i></a></li>
                </SocialLinks>
            </SocialCard>
            <SocialCard>
                <ImageContainer><img src={imgFelix} alt="Felix Kramer"/></ImageContainer>
                <H4>Felix Kramer</H4>
                <SocialLinks>
                    <li><a href="https://twitter.com/FelixLFK"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/flfkramer/"><i class="fa fa-linkedin"></i></a></li>
                    <li><a href="https://github.com/flfk"><i class="fa fa-github"></i></a></li>
                </SocialLinks>
            </SocialCard>
            <SocialCard>
                <ImageContainer><img src={imgKyle} alt="Kyle Bryant"/></ImageContainer>
                <H4>Kyle Bryant</H4>
                <SocialLinks>
                    <li><a href="https://twitter.com/komodoman"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/kyle-c-bryant/"><i class="fa fa-linkedin"></i></a></li>
                    <li><a href="https://github.com/Kyrrui"><i class="fa fa-github"></i></a></li>
                    <li><a href="https://medium.com/@kylebryant_28277"><i class="fa fa-medium"></i></a></li>
                </SocialLinks>
            </SocialCard>
            <SocialCard>
                <ImageContainer><img src={imgMike} alt="Mike Calvanese"/></ImageContainer>
                <H4>Mike Calvanese</H4>
                <SocialLinks>
                    <li><a href="https://twitter.com/MikeCalvanese"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/michael-calvanese-940b356/"><i class="fa fa-linkedin"></i></a></li>
                    <li><a href="https://github.com/mikec"><i class="fa fa-github"></i></a></li>
                </SocialLinks>
            </SocialCard>
        </TeamContainer>

      </ContainerColumn>
    );
  }
}

const TeamContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    >* {
        margin 8px;
    }

`;

const SocialCard = Card.extend`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ImageContainer = styled.div`
    height: 88px;
    width: 88px;

    img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
    }
`;

const SocialLinks = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.big ? 'center': 'space-around'};
    list-style: none;
    padding: 0 16px;

    li > a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.80);
        font-size: ${props => props.big ? '24px': '16px'};
    }

    li:not(:first-child) {
            padding-left: ${props => props.big ? '16px': '8px'};
        }
`;

export default AboutUs;