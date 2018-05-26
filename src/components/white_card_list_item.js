import React, { Component } from 'react';
import Card from './card';

class WhiteCardListItem extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<li className="list-group-item">
				<div className="card-list media">
					<div className="media-left">
						<Card title={this.props.title} />
					</div>
				</div>
			</li>
		)
	}
}

export default WhiteCardListItem;
