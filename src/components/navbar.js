import React from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import styled from 'styled-components';

const NavBar = (props) => {
  return (
      <nav>
        <NavigationContainer>
        </NavigationContainer>
      </nav>
  );
};

const NavigationContainer = styled.ul`
  margin: 100px 0;
  z-index: 99999;
  background-color: red;
`;

export default NavBar;
