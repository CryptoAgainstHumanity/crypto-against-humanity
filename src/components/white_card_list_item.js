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
						<Card text={this.props.text} color={this.props.color}/>
					</div>
				</div>
			</li>
		)
	}
}

export default WhiteCardListItem;
