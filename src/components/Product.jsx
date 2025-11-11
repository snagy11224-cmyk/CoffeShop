import React, { useState } from 'react';

const Product = () => {
  const [state, setState] = useState({
    name: 'burger',
    count: 3,
    imgUrl: 'logo192.png'
  });

  return (
    <div>
        <img src={this.state.imgUrl} alt="img"/>
      <span>{state.name}</span>
      <span className='badge bg-primary m-2'>{state.count}</span>
    </div>
  );
}

export default Product;