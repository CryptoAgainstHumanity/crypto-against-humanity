import React, { Component } from 'react';
import Card from './card';
import styled from 'styled-components';
import {
  H1, LABEL,
} from '../Styles';

class ContainerBlackCard extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<BlackCardContainer>
					<div className="black-card">
						<Card text={this.props.blackCard.text} color={this.props.blackCard.color} />
					</div>
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
