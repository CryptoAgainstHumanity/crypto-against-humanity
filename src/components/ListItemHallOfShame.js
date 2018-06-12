import Card from './Card';
import React from 'react';
import styled from 'styled-components';
import {
  H1, LABEL,
} from '../StyleGuide';

const HallOfShameListItem = (props) => {
  const { blackCardTxt, whiteCardTxt, price, date } = props;

  return (
    <ListItemHallOfShame>
      <Card black>{blackCardTxt}</Card>
      <Card white>{whiteCardTxt}</Card>
      <HallOfShameDash>
        <div>
          <LABEL>DATE</LABEL>
          <H1>Ξ {date}</H1>
        </div>
        <div>
          <LABEL>PRICE</LABEL>
          <H1>Ξ {price}</H1>
        </div>
      </HallOfShameDash>
    </ListItemHallOfShame>
  );
}

const ListItemHallOfShame = styled.li`
  padding: 0px;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  >div:first-child {
    margin-right: 8px;
  }

  >div:not(last-child) {
    flex: 0 0 auto;
  }

  :not(:first-child) {
    margin-top: 24px;
  }
`;

const HallOfShameDash = styled.div`
  flex: 1 1 auto;
  padding: 24px 0 16px 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default HallOfShameListItem;