import Btn from './Button';
import DropdownMenu from './DropdownMenu';
import React, { Component } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { COLORS_TEXT, COLORS_OBJ } from '../StyleGuide';

class HeaderWhiteCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSortMenu: false,
    }
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
    const {sortTypeOptions, sortType, handleSort, handleSearch} = this.props;

    const sortTypeButtons = sortTypeOptions.map((type) =>
          <Btn onClick={handleSort} value={type}>{type}</Btn>
        );

    return (
      <HeaderList>
        <BtnDropDown onClick={this.showSortMenu}>
          {sortType} <i class="fa fa-caret-down"/>
        </BtnDropDown>
        {this.state.showSortMenu?
          <DropdownMenu>
            {sortTypeButtons}
          </DropdownMenu> :
          ( null )
        }
        <SearchBar handleSearch={handleSearch}/>
      </HeaderList>
    );
  }
};

const HeaderList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const BtnDropDown = Btn.extend`
  margin-right: 16px;
  width: 96px;
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

export default HeaderWhiteCards;
