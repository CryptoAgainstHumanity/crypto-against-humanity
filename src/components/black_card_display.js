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
	            		<p className="text"> TIME LEFT IN ROUND </p>
	            	<div className="clock"> CLOCK OBJECT </div>
          		</div>
          		<Button className="propose-black-card center">Propose Black Card</Button>
			</div>

		)
	}
}

export default BlackCardDisplay;
