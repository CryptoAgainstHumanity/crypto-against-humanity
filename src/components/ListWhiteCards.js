import React, { Component } from 'react';
import WhiteCardListItem from './white_card_list_item';
import styled from 'styled-components';

export default ((props) => {
	let i = 0;
	const whiteCards = props.whiteCards.map((card) => {
		i++
		return <WhiteCardListItem
			key={`white_card_${i}`}
			bondingCurveAddress={card.bondingCurveAddress}
			text={card.text}
			color={card.color}
			price={card.price}
			balance={card.balance} />
	})

	return (
		<ListWhiteCards>
			{whiteCards}
		</ListWhiteCards>
	);
})

const ListWhiteCards = styled.ul`
	background-color: pink;
	padding: 0;
`;
