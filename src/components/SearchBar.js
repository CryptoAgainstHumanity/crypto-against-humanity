import React from 'react';
import styled from 'styled-components';
import { COLORS_OBJ, COLORS_TEXT, MEDIA } from '../StyleGuide';
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
  width: calc(24px + 176px);
  border-bottom: 2px solid ${COLORS_OBJ.secondary.low};
  color: ${COLORS_TEXT.bgLight.low};
  font-size:16px;
  font-weight: bold;

  :focus-within {
    color: ${COLORS_TEXT.bgLight.high};
    border-bottom: 2px solid ${COLORS_OBJ.secondary.high};
  }

  ${MEDIA.tablet} {
    display: none;
  }
`;

const SearchForm = styled.input`
  width: 176px;
  padding: 0.5em 1em;
  background-color: transparent;
  border: none;
  outline: none;

  ::placeholder {
    color: ${COLORS_TEXT.bgLight.low};
  }
`;

export default SearchBar;
