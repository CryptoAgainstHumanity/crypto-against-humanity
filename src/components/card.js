import React, { Component } from 'react';

class Card extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<li className="list-group-item">
				<div className="card-list media">
					<div className="media-left">
						<div className="card white-card">
							<p>{this.props.title}</p>
						</div>
					</div>
				</div>
			</li>
		)
	}
}

export default Card;
