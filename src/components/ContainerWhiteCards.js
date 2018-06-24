import _ from 'lodash';
import Btn from './Button';
import React, { Component } from 'react';
import ListWhiteCards from './ListWhiteCards';
import styled from 'styled-components';
import SearchBar from './SearchBar';
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
      whiteCards: [],
      sortType: 'Pricey Cards',
      showSortMenu: false,
      blockNumCurrent: 3490823,
    }
  }

  componentDidMount() {
    this.setState({whiteCards: this.props.whiteCards});

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
  }

  getSortedCards = (whiteCards, sortType) => {
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
  }

  handleSort = (event) => {
    const whiteCards = this.props.whiteCards;
    const sortType = event.target.value;
    const updatedCards = this.getSortedCards(whiteCards, sortType);
    this.setState({sortType: sortType});
    this.setState({whiteCards: updatedCards});
  }

  handleSearch = (event) => {
    console.log('hello world');
    const searchText = event.target.value.toLowerCase();
    let filteredCards = this.props.whiteCards
      .filter(card => card.text.toLowerCase().search(searchText) !== -1);
    const updatedCards = this.getSortedCards(filteredCards, this.state.sortType);
    this.setState({whiteCards: updatedCards});
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

    const sortTypes = ['Trendy Cards', 'Pricey Cards', 'New Cards', 'Your Cards'];
    const sortTypeButtons = sortTypes.map((type) =>
        <Btn onClick={this.handleSort} value={type}>{type}</Btn>
      );

    return (
			<div>
        <SearchBar handleSearch={this.handleSearch}/>
        <BtnDropDown onClick={this.showSortMenu}>
          {this.state.sortType} <i class="fa fa-caret-down"/>
        </BtnDropDown>
        {this.state.showSortMenu?
          <DropdownSort>
            {sortTypeButtons}
          </DropdownSort> :
          ( null )
        }
      <Container>
        <ListWhiteCards whiteCards={this.state.whiteCards}/>
      </Container>
      </div>
		);
	}
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100vh - 64px - 64px - 56px - 16px);
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
