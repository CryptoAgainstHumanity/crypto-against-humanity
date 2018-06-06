import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class ContactCard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const cardClass = "card " + this.props.color;
		return (
			<div className={cardClass}>
				<div className="text-center"><img src={this.props.image} class="img-thumbnail img-circle" width="100px" height="100px"/></div>
				<div className="card-text text-center">{this.props.text}</div>
			</div>
		)
	}
}

export default ContactCard;
