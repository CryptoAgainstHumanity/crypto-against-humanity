import React, { Component } from 'react';

class Card extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<li className="list-group-item">
				<div className="card white-card">
					<p>{this.props.title}</p>
				</div>
			</li>
		)
	}
}

export default Card;
