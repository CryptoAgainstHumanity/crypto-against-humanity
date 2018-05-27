import React, { Component } from 'react';
import WhiteCardListItem from './white_card_list_item';

export default ((props) => {
	let i = 0;
	const whiteCards = props.whiteCards.map((card) => {
		i++
		return <WhiteCardListItem
			key={`white_card_${i}`}
			text={card.text}
			color={card.color}
			price={card.price}
			balance={card.balance} />
	})

	return (
		<ul className="col-md-4 list-group">
			{whiteCards}
		</ul>
	);
})
