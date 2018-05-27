import React from 'react';

const hallOfShameItem = (props) => {
  const { blackCardTxt, whiteCardTxt, price, date } = props;

  console.log(blackCardTxt, whiteCardTxt, price, date);

  // Manually overrode white-card style to black color scheme to avoid duplicating CSS
  return (
    <div className="hall-of-shame-div">
      <div className="white-card hall-of-shame-item hall-of-shame-card" style={{backgroundColor: '#323639', color: 'white'}}>
        {blackCardTxt}
      </div>
      <div className="white-card hall-of-shame-item hall-of-shame-card">
        {whiteCardTxt}
      </div>
      <div className="hall-of-shame-item-lbls hall-of-shame-item">
        <div className="price-label-div hall-of-shame-price-lbl">
              <div className='lbl-text'>PRICE</div>
              <div className='price-data header-1'>Ξ {price}</div>
            </div>
            <div className="balance-label-div">
              <div className='lbl-text'>DATE</div>
              <div className='balance-data header-1'>{date}</div>
            </div>
      </div>
    </div>
  );
}

export default hallOfShameItem;