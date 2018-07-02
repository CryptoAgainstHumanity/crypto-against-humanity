import React from 'react';
import styled from 'styled-components';
import { COLORS_OBJ } from '../StyleGuide';
import { LineChart, Line } from 'recharts';

const WhiteCardPriceChart = (props) => {

  const data = [
    {name: 'DAY1', price: 2400},
    {name: 'DAY2', price: 1398},
    {name: 'DAY3', price: 9800},
    {name: 'DAY4', price: 3908},
    {name: 'DAY5', price: 4800},
    {name: 'DAY6', price: 3800},
    {name: 'DAY7', price: 4300},
  ];

  return (
    <PriceChart>
      <LineChart width={96} height={72} data={data}>
        <Line type='monotone' dataKey='price' stroke={COLORS_OBJ.secondary.medium} strokeWidth={2} />
      </LineChart>
    </PriceChart>
  );
};

export default WhiteCardPriceChart;

const PriceChart = styled.div`
  // border: 1px solid blue;
`;
