import React from 'react';

const Card = ({title}) => {
	return ( 
		<li className="list-group-item">
			<div className="card-list media">
				<div className="media-left">
					<div className="card white-card">
						<p>{title}</p>
					</div>
				</div>
			</div>
		</li>
	)
}

export default Card;