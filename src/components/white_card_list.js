import React, { Component } from 'react';
import WhiteCardListItem from './white_card_list_item';

class WhiteCardList extends Component {
	constructor(props) {
		super(props)

		const whiteCards = props.whiteCards.map((card) => {
			return <WhiteCardListItem
				text={card.text}
				color={card.color}
				price={card.price}
				balance={card.balance} />
		})

		this.state = {
			whiteCards
		}
	}

	render() {
		return (
			<ul className="col-md-4 list-group">
				{this.state.whiteCards}
			</ul>
		);
	}
}

export default WhiteCardList;
