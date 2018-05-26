import React from 'react';

const MenuBar = (props) => {
	return (
      <div className="topnav">
        <a href="#home"><h2>Crypto Against Humanity</h2></a>
        <a href="#current-round" >Current Round</a>
        <a href="#ctr">Black Card Token Registry</a>
        <a href="#hall-of-shame">Hall of Shame</a>
      </div>
	);
};

export default MenuBar;