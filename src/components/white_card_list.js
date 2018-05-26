import React from 'react';
import WhiteCardListItem from './white_card_list_item';

const WhiteCardList = (props) => {
	const whiteCards = props.whiteCards.map((card) => {
		return <WhiteCardListItem text={card.text} color={card.color} />
	});
	return (
		<ul className="col-md-4 list-group">
			{whiteCards}
		</ul>
	);
};

export default WhiteCardList;