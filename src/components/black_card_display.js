import React, { Component } from 'react';
import Card from './card';
import { Button } from 'react-bootstrap'

class BlackCardDisplay extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h1 className="center"> Card in Play </h1>
					<div className="black-card">
						<Card text={this.props.blackCard.text} color={this.props.blackCard.color} />
					</div>
		          	<div className="time-left center">
	            		<p className="text"> Time Remaining: {this.props.blackCard.timeRemaining} </p>
          		</div>
          		<Button className="propose-black-card center">Propose Black Card</Button>
			</div>

		)
	}
}

export default BlackCardDisplay;
