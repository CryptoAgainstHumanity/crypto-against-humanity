import React, { Component } from 'react';
import Card from './Card';
import styled from 'styled-components';
import {
  H1, LABEL,
} from '../StyleGuide';

class ContainerBlackCard extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<BlackCardContainer>
				<Card bigCard black>{this.props.blackCard.text}</Card>
      	<TimeContainer>
      		<LABEL>TIME REMAINING</LABEL>
      		<H1>{this.props.timeRemaining}</H1>
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
	justify-content: center;

	>:not(:first-child) {
		margin-top: 0;
	}
`;

export default ContainerBlackCard;
