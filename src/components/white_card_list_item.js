import React from 'react';

const WhiteCardListItem = ({card}) => {
	return ( 
		<li className="list-group-item">
			<div className="card-list media">
				<div className="media-left">
					<p>{card}</p>
				</div>
			</div>
		</li>
	)
}

export default WhiteCardListItem;