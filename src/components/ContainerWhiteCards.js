import _ from 'lodash';
import Btn from './Button';
import React, { Component } from 'react';
import ListWhiteCards from './ListWhiteCards';
import styled from 'styled-components';
import web3 from '../web3'
import {
  COLORS_OBJ, COLORS_TEXT, HAS_BORDER_RADIUS, HAS_SHADOW, DARKEN, MEDIA,
} from '../StyleGuide';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

const AVG_HOURS_PER_ETH_BLOCK = 0.0042; // 15 seconds / 60 secs p. min / 60 min . pour

class ContainerWhiteCards extends Component {
	constructor(props) {
    super(props)
    this.state = {
      whiteCardSortType: 'Pricey Cards',
      showSortMenu: false,
      blockNumCurrent: 3490823,
    }
  }

  componentDidMount() {
    // get updated block number
    web3.eth.getBlockNumber((err, blockNumCurrent) => {
      this.setState({blockNumCurrent: blockNumCurrent})
    });
  }

   // Trendingscore based on Hacker News ranking algorithm (source: https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d)
  getTrendingScore = (card) => {
    // NOTE will need to reverse engineer the 'points' based on curve used
      const points = card.price;
      const blockNumCard = card.blockNum;
      const hoursSinceSubmission = (this.state.blockNumCurrent - blockNumCard) * AVG_HOURS_PER_ETH_BLOCK;
      const gravity = 1.8;
      const score = (points-1) / Math.pow((hoursSinceSubmission+2), gravity);
      // console.log(`score since is ${score}`);
    // console.log(`hours since is ${hoursSinceSubmission}`);
  }


  getSortedCards = (whiteCards) => {
    const sortType = this.state.whiteCardSortType;

    if (sortType === 'Pricey Cards') {
      return _.orderBy(whiteCards, ['price'], ['desc'])
    }
    if (sortType === 'New Cards') {
      return _.orderBy(whiteCards, ['blockNum'], ['desc'])
    }
    if (sortType === 'Your Cards') {
      const whiteCardsOwned = whiteCards.filter(card => card.balance > 0);
      return _.orderBy(whiteCardsOwned, ['balance'], ['desc']);
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

    // console.log(whiteCards);
    console.log(whiteCardsSorted);

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
  margin-bottom: 16px;
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
  top: 148px;
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

  ${MEDIA.tablet} {
    top: 734px;
  }
`;

export default ContainerWhiteCards;
