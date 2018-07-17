import React, { Component } from 'react';
import Card from './Card';
import styled from 'styled-components';
import {
  COLORS_TEXT, H2, H4
} from '../StyleGuide';

class ContainerBlackCard extends Component {
	render() {
		return (
			<BlackCardContainer>
      	<Card bigCard black>{this.props.blackCard.text}</Card>
      	<TimeContainer>
      		<TimeLabel>New black card in</TimeLabel>
      		<Time>{this.props.timeRemaining}</Time>
  			</TimeContainer>

			</BlackCardContainer>
		);
	};
}

const BlackCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	}
`;

const TimeContainer = styled.div`
	margin-top: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Time = H2.extend`
	margin-top: 4px;
	color: ${COLORS_TEXT.bgLight.low};
`;

const TimeLabel = H4.extend`
	color: ${COLORS_TEXT.bgLight.low};
`;

export default ContainerBlackCard;
