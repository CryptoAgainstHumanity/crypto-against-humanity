import _ from 'lodash';
import Btn from './Button';
import DropdownMenu from './DropdownMenu';
import React, { Component } from 'react';
import ListWhiteCards from './ListWhiteCards';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import web3 from '../web3'
import { COLORS_TEXT, COLORS_OBJ } from '../StyleGuide';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

const AVG_HOURS_PER_ETH_BLOCK = 0.0042; // 15 seconds / 60 secs p. min / 60 min . pour

class ContainerWhiteCards extends Component {
	constructor(props) {
    super(props)
    this.state = {
      whiteCards: [],
      sortTypeOptions: ['Pricey Cards', 'Trendy Cards', 'New Cards', 'Your Cards'],
      sortType: 'Pricey Cards',
      searchText: '',
      showSortMenu: false,
      blockNumCurrent: 0,
    }
  }

  componentWillMount() {
    const sortedCards = this.getSortedCards(this.props.whiteCards, this.state.sortType);
    this.setState({whiteCards: sortedCards});

    // get updated block number
    web3.eth.getBlockNumber((err, blockNumCurrent) => {
      this.setState({blockNumCurrent: blockNumCurrent})
    });
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
    const sortTypeButtons = this.state.sortTypeOptions.map((type) =>
        <Btn onClick={this.handleSort} value={type}>{type}</Btn>
      );

    return (
      <Container>

        <HeaderWhiteCards>
          <BtnDropDown onClick={this.showSortMenu}>
            {this.state.sortType} <i class="fa fa-caret-down"/>
          </BtnDropDown>
          {this.state.showSortMenu?
            <DropdownMenu>
              {sortTypeButtons}
            </DropdownMenu> :
            ( null )
          }
          <SearchBar handleSearch={this.handleSearch}/>
        </HeaderWhiteCards>

        <ListWhiteCards whiteCards={this.state.whiteCards}/>

      </Container>
		);
	}
}

const Container = styled.div`
  height: calc(100vh - 64px - 24px);
  width: 528px;
  overflow: auto;
`;

const HeaderWhiteCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const BtnDropDown = Btn.extend`
  margin-right: 16px;
  width: 160px;
  border: none
  border-bottom: 2px solid ${COLORS_OBJ.secondary.medium};
  color: ${COLORS_TEXT.bgLight.medium};
  border-radius: 0;

  :hover {
    color: ${COLORS_TEXT.bgLight.high};
    border-bottom: 2px solid ${COLORS_OBJ.secondary.high};
    background-color: transparent;
  }
`;

export default ContainerWhiteCards;
