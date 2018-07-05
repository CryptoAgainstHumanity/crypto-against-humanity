import React from 'react';
import WhiteCardListItem from './ListItemWhiteCards';
import styled from 'styled-components';

const ListWhiteCards = ((props) => {
	let i = 0;
	const whiteCards = props.whiteCards.map((card) => {
		i++
		return <WhiteCardListItem
			key={`white_card_${i}`}
			bondingCurveAddress={card.bondingCurveAddress}
			text={card.text}
			color={card.color}
			price={card.price}
			balance={card.balance}
			poolBalance={card.poolBalance}
			totalSupply={card.totalSupply}
			events={card.events}
			blockNum={card.blockNum}
			blockNumCurrent={props.blockNumCurrent}
			/>
	})

	return (
		<WhiteCardList>
			{whiteCards}
		</WhiteCardList>
	);
})

const WhiteCardList = styled.ul`
	padding: 0;
`;

export default ListWhiteCards;
