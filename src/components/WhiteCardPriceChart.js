import styled from 'styled-components';
import { COLORS_OBJ } from '../StyleGuide';
import { LineChart, Line } from 'recharts';
import React, { Component } from 'react';

class WhiteCardPriceChart extends Component {
constructor(props) {
  super(props)
}
// const WhiteCardPriceChart = (props) => {
//   super(props)

  // const data = []
  // for (var i = 0; i < this.props.events.length; i++) {
  //   //data.push({name: this.props.events[i].blockNum, price: this.props.events[i].price})
  //   data.push({name: i, price: 0})
  // }

//   // const data = [
//   //   {name: 'DAY1', price: 2400},
//   //   {name: 'DAY2', price: 1398},
//   //   {name: 'DAY3', price: 9800},
//   //   {name: 'DAY4', price: 3908},
//   //   {name: 'DAY5', price: 4800},
//   //   {name: 'DAY6', price: 3800},
//   //   {name: 'DAY7', price: 4300},
//   // ];

//   return (
//     <PriceChart>
//       <LineChart width={96} height={72} data={data}>
//         <Line type='monotone' dataKey='price' stroke={COLORS_OBJ.secondary.medium} strokeWidth={2} />
//       </LineChart>
//     </PriceChart>
//   );
// };
  render() {
    const data = []
    for (var i = 0; i < this.props.events.length; i++) {
      data.push({name: this.props.events[i].blockNum, price: this.props.events[i].price})
      //data.push({name: i, price: 0})
    }
    return (
      <PriceChart>
        <LineChart width={96} height={72} data={data}>
          <Line type='monotone' dataKey='price' stroke={COLORS_OBJ.secondary.medium} strokeWidth={2} />
        </LineChart>
      </PriceChart>
    );
  }
}

export default WhiteCardPriceChart;

const PriceChart = styled.div`
  // border: 1px solid blue;
`;
