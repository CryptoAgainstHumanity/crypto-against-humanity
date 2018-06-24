import React from 'react';
import styled from 'styled-components';
import {
  COLORS_OBJ, COLORS_TEXT, HAS_BORDER_RADIUS, DARKEN,
} from '../StyleGuide';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

const SearchBar = (props) => {
  return (
        <SearchGroup>
            <i class="fa fa-search"></i>
            <SearchForm type="text" placeholder="Search" onChange={props.handleSearch}/>
        </SearchGroup>
    );
};

const SearchGroup = styled.form`
  border-bottom: 2px solid ${COLORS_OBJ.secondary.medium};
  color: ${COLORS_TEXT.bgLight.low};
  :focus-within {
    color: ${COLORS_TEXT.bgLight.high};
  }
`;

const SearchIcon = styled.img`
  height: 24px;
  width: 24px;
`;

const SearchForm = styled.input`
  background-color: transparent;
  padding: 0.5em 1em;
  border: none;
  outline: none;

  font-size:16px;
  font-weight: bold;
`;


export default SearchBar;
