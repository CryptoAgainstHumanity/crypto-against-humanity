import React, { Component } from "react";
import ReactGA from 'react-ga';
import styled from 'styled-components'
import imgKyle from'./imgs/kyle.jpeg';
import imgEmily from'./imgs/emily.jpeg';
import imgFelix from'./imgs/felix.jpeg';
import imgMike from'./imgs/mike.jpeg';
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
        <div className="header-1 centered-title">About Us</div>
        <div className="lbl-text margin-text centered-text">
        Crypto Against Humanity was birthed out of 36 hours without sleep, 4 dedicated teammates, and the legendary ETH Buenos Aires Hackathon.
        Our team is working hard to bring bad behavior to the Ethereum blockchain. <br/><br/>

        We hope you enjoy Crypto Against Humanity as much as we enjoyed creating it. <br/><br/>

        If you're feeling lonely follow us on Twitter, Github or Medium! <br/><br/>

        <SocialLinks large>
            <li><a href="https://twitter.com/CryptoVHumanity" class="fa fa-twitter" /></li>
            <li><a href="https://github.com/CryptoAgainstHumanity" class="fa fa-github"/></li>
            <li><a href="https://medium.com/crypto-against-humanity" class="fa fa-medium"/></li>
        </SocialLinks>
        <br/>
        To suggest ideas on how to accelerate our plan for world destruction please contact us at <a href="mailto:Inquiries@CryptoAgainstHumanity.io">Inquiries@CryptoAgainstHumanity.io or</a>.

        </div>
            <TeamContainer>
                <WhiteCard>
                    <ImageContainer><img src={imgEmily} alt="Emily Williams"/></ImageContainer>
                    <H3>Emily Williams</H3>
                    <SocialLinks>
                        <li><a href="https://twitter.com/crypt0glitter" class="fa fa-twitter" /></li>
                        <li><a href="https://www.linkedin.com/in/ecwilliams66/ " class="fa fa-linkedin"/></li>
                        <li><a href="https://github.com/emaG3m" class="fa fa-github"/></li>
                    </SocialLinks>
                </WhiteCard>
                <WhiteCard>
                    <ImageContainer><img src={imgFelix} alt="Felix Kramer"/></ImageContainer>
                    <H3>Felix Kramer</H3>
                    <SocialLinks>
                        <li><a href="https://twitter.com/FelixLFK" class="fa fa-twitter" /></li>
                        <li><a href="https://www.linkedin.com/in/flfkramer/" class="fa fa-linkedin"/></li>
                        <li><a href="https://github.com/flfk" class="fa fa-github"/></li>
                        <li><a href="https://medium.com/@CryptoEspresso" class="fa fa-medium"/></li>
                    </SocialLinks>
                </WhiteCard>
                <WhiteCard>
                    <ImageContainer><img src={imgKyle} alt="Kyle Bryant"/></ImageContainer>
                    <H3>Kyle Bryant</H3>
                    <SocialLinks>
                        <li><a href="https://twitter.com/komodoman" class="fa fa-twitter" /></li>
                        <li><a href="https://www.linkedin.com/in/kyle-c-bryant/" class="fa fa-linkedin"/></li>
                        <li><a href="https://github.com/Kyrrui" class="fa fa-github"/></li>
                        <li><a href="https://medium.com/@kylebryant_28277" class="fa fa-medium"/></li>
                    </SocialLinks>
                </WhiteCard>
                <WhiteCard>
                    <ImageContainer><img src={imgMike} alt="Mike Calvanese"/></ImageContainer>
                    <H3>Mike Calvanese</H3>
                    <SocialLinks>
                        <li><a href="https://twitter.com/MikeCalvanese" class="fa fa-twitter" /></li>
                        <li><a href="https://www.linkedin.com/in/michael-calvanese-940b356/" class="fa fa-linkedin"/></li>
                        <li><a href="https://github.com/mikec" class="fa fa-github"/></li>
                    </SocialLinks>
                </WhiteCard>
            </TeamContainer>
            <div className="lbl-text margin-text centered-text">

            </div>
      </div>
    );
  }
}

const TeamContainer = styled.div`
    width: 992px;
    display: flex;
    justify-content: space-around;
    padding: 40px;
`;

const WhiteCard = styled.div`
    background-color: white;
    font-weight: bold;
    width: 160px;
    height: ${160*1.25}px;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
    color: #333333;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const H3 = styled.h3`
    margin: 0;
    font-family: Arial;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
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
    justify-content: ${props => props.large ? 'center': 'space-around'};
    list-style: none;
    padding: 0 16px;

    li {
        a {
            text-decoration: none;
            color: rgba(0, 0, 0, 0.80);
            font-size: ${props => props.large ? '24px': '16px'};
        }
    }

    li:not(:first-child) {
            padding-left: ${props => props.large ? '16px': '8px'};
        }


`;

export default AboutUs;