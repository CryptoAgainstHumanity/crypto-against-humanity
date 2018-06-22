import _ from 'lodash';
import Btn from './Button';
import React, { Component } from 'react';
import ListWhiteCards from './ListWhiteCards';
import styled from 'styled-components';
import {
  COLORS_OBJ, COLORS_TEXT, HAS_BORDER_RADIUS, HAS_SHADOW, DARKEN,
} from '../StyleGuide';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

const MILISECONDS_PER_HOUR = 3600000;

class ContainerWhiteCards extends Component {
	constructor(props) {
    super(props)
    this.state = {
      whiteCardSortType: 'Trendy Cards',
      showSortMenu: false,
    }
  }

   // Trendingscore based on Hacker News ranking algorithm (source: https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d)
  getTrendingScore = (card) => {
    // NOTE will need to reverse engineer the 'points' based on curve used
    const points = card.price + 1;
    const hoursSinceSubmission = (Date.now() - card.timestamp) / MILISECONDS_PER_HOUR;
    const gravity = 1.8;
    const score = (points-1) / Math.pow((hoursSinceSubmission+2), gravity);
    return score;
  }

  getSortedCards = (whiteCards) => {
    const sortType = this.state.whiteCardSortType;

    if (sortType === 'Pricey Cards') {
      return _.orderBy(whiteCards, ['price'], ['desc'])
    }
    if (sortType === 'New Cards') {
      return _.orderBy(whiteCards, ['timestamp'], ['desc'])
    }
    if (sortType === 'Your Cards') {
      return whiteCards.filter(card => card.balance > 0);
    }
    if (sortType === 'Trendy Cards') {
      const whiteCardsSorted = whiteCards
        .slice()
        .sort((a, b) => this.getTrendingScore(b)- this.getTrendingScore(a));
      return whiteCardsSorted;
    }

    return whiteCards;
  }

  handleSort = (event) => {
    this.setState({whiteCardSortType: event.target.value})
  }

  showSortMenu = (event) => {
    event.preventDefault();
    this.setState({showSortMenu: true}, () => {
      document.addEventListener('click', this.closeSortMenu);
    });
  }

  closeSortMenu = () => {
    this.setState({showSortMenu: false}, () => {
      document.removeEventListener('click', this.closeSortMenu);
    })
  }


	render() {
		const {whiteCards} = this.props;

    const whiteCardsSorted = this.getSortedCards(whiteCards);

    const whiteCardsDiv = whiteCardsSorted.map((card) => {
      return <div key={card.text}>
        Price: {card.price} -----
        Balance: {card.balance} -----
        Trending: {this.getTrendingScore(card)} -----
        Text: {card.text}
      </div>
    });

    const sortTypes = ['Trendy Cards', 'Pricey Cards', 'New Cards', 'Your Cards'];
    const sortTypeButtons = sortTypes.map((type) =>
        <Btn onClick={this.handleSort} value={type}>{type}</Btn>
      );

    return (
			<div>
        <BtnDropDown onClick={this.showSortMenu}>
          {this.state.whiteCardSortType} <i class="fa fa-caret-down"/>
        </BtnDropDown>
        {this.state.showSortMenu?
          <DropdownSort>
            {sortTypeButtons}
          </DropdownSort> :
          ( null )
        }
      <Container>
        <ListWhiteCards whiteCards={whiteCardsSorted}/>
      </Container>
      </div>
		);
	}
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100vh - 64px - 64px);
  width: 528px;
  overflow: auto;
`;

const BtnDropDown = Btn.extend`
  border: none
  border-bottom: 2px solid ${COLORS_TEXT.bgLight.high};
  color: ${COLORS_TEXT.bgLight.high};
  border-radius: 0;
  width: 160px;

  :hover {
    color: ${COLORS_TEXT.bgLight.high};
    border-bottom: 2px solid ${COLORS_TEXT.bgLight.high};
    background-color: transparent;
  }

`;

const DropdownSort = styled.div`
  position: absolute;
  top: 144px;
  width: 156px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 2px solid ${COLORS_OBJ.secondary.high};
  ${HAS_BORDER_RADIUS};
  ${HAS_SHADOW};

  button {
    border: none;
    border-radius: 0;
    transition: none;
    color: ${COLORS_OBJ.secondary.high};

    :hover {
      background-color: ${DARKEN('#FFFFFF')};
      color: ${COLORS_TEXT.bgLight.high};
    }
  }
`;

export default ContainerWhiteCards;
