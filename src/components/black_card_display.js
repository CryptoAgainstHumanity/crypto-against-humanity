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
		          	<div className="time-left">
	            		<div className="lbl-text">TIME REMAINING</div>
	            		<div className="header-1">{this.props.timeRemaining}</div>
          		</div>
			</div>

		)
	}
}

export default BlackCardDisplay;
