import React from 'react';
import styled from 'styled-components';
import { H1, LABEL } from '../StyleGuide';

const WhiteCardBalance = (props) => {
  return (
      <Container>
        <LABEL>YOUR BALANCE</LABEL>
        WhiteCardBalance
      </Container>
  );
};

const Container = styled.div`
  width: 160px;
  height: ${(160*1.2)}px;

  background-color: red;
`;

export default WhiteCardBalance;
