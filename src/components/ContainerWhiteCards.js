import _ from 'lodash';
import HeaderWhiteCards from './HeaderWhiteCards';
import React, { Component } from 'react';
import ListWhiteCards from './ListWhiteCards';
import styled from 'styled-components';
import { MEDIA } from '../StyleGuide';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

const AVG_HOURS_PER_ETH_BLOCK = 0.0042; // 15 seconds / 60 secs p. min / 60 min . pour

class ContainerWhiteCards extends Component {
	constructor(props) {
    super(props)
    this.state = {
      whiteCards: [],
      sortTypeOptions: ['Price', 'Hot', 'New', 'Mine'],
      sortType: 'Price',
      searchText: '',
      showSortMenu: false,
      blockNumCurrent: 0,
    }
  }

  componentWillMount() {
    const sortedCards = this.getSortedCards(this.props.whiteCards, this.state.sortType);
    this.setState({whiteCards: sortedCards});

    // get updated block number
    // web3.eth.getBlockNumber((err, blockNumCurrent) => {
    //   this.setState({blockNumCurrent: blockNumCurrent})
    // });

    // get updated block number
    var blockNum = 0;
    for (var i=0; i < sortedCards.length; i++) {
      if (sortedCards[i].blockNum > blockNum) {
        blockNum = sortedCards[i].blockNum
      }
    }
    this.setState({blockNumCurrent: blockNum})
  }

   // Trendingscore based on Hacker News ranking algorithm (source: https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d)
  getTrendingScore = (card) => {
    // NOTE will need to reverse engineer the 'points' based on curve used
      const points = card.totalSupply / (10**8);
      const blockNumCard = card.blockNum;
      const hoursSinceSubmission = (this.state.blockNumCurrent - blockNumCard) * AVG_HOURS_PER_ETH_BLOCK;
      const gravity = 1.8;
      if (points > 0 ) {
        const score = (points) / Math.pow((hoursSinceSubmission+2), gravity);
        return score;
      }
      return 0;
  }

  getSortedCards = (whiteCards, sortType) => {
    if (sortType === 'Price') {
      return _.orderBy(whiteCards, ['price'], ['desc'])
    }
    if (sortType === 'New') {
      return _.orderBy(whiteCards, ['blockNum'], ['desc'])
    }
    if (sortType === 'Mine') {
      const whiteCardsOwned = whiteCards.filter(card => card.balance > 0);
      return _.orderBy(whiteCardsOwned, ['balance'], ['desc']);
    }
    if (sortType === 'Hot') {
      const whiteCardsSorted = whiteCards
        .slice()
        .sort((a, b) => this.getTrendingScore(b)- this.getTrendingScore(a));
      return whiteCardsSorted;
    }
  }

  handleSort = (event) => {
    const whiteCards = this.props.whiteCards;
    const sortType = event.target.value;
    const sortedCards = this.getSortedCards(whiteCards, sortType);
    const updatedCards = this.getSearchedCards(sortedCards, this.state.searchText);
    this.setState({sortType: sortType});
    this.setState({whiteCards: updatedCards});
  }

  getSearchedCards = (whiteCards, searchText) => {
    const filteredCards = whiteCards
      .filter(card => card.text.toLowerCase().search(searchText) !== -1);
    return filteredCards;
  }

  handleSearch = (event) => {
    const whiteCards = this.props.whiteCards;
    const searchText = event.target.value.toLowerCase();
    const filteredCards = this.getSearchedCards(whiteCards, searchText);
    const updatedCards = this.getSortedCards(filteredCards, this.state.sortType);
    this.setState({searchText: searchText});
    this.setState({whiteCards: updatedCards});
  }

	render() {
    return (
      <Container>

        <HeaderWhiteCards
          sortTypeOptions={this.state.sortTypeOptions}
          sortType={this.state.sortType}
          showSortMenu={this.showSortMenu}
          handleSort ={this.handleSort}
          handleSearch ={this.handleSearch}
        />

        <ListWhiteCards
          whiteCards={this.state.whiteCards}
          blockNumCurrent={this.state.blockNumCurrent}
        />

      </Container>
		);
	}
}

const Container = styled.div`
  height: calc(100vh - 64px - 24px);
  width: 528px;
  overflow: auto;

  ${MEDIA.phone} {
    height: auto;
    width: auto;
  }
`;

export default ContainerWhiteCards;
