import React, { Component } from 'react';

class Card extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const cardClass = "card " + this.props.color;
		return (
			<div className={cardClass}>
				<p>{this.props.text}</p>
			</div>
		)
	}
}

export default Card;
