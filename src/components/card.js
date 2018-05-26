import React, { Component } from 'react';

class Card extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const cardClass = "card " + this.props.color;
		return (
			<div className={cardClass}>
				<div className="card-text">{this.props.text}</div>
			</div>
		)
	}
}

export default Card;
