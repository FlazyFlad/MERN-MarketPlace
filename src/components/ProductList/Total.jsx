// Total.js
import React from 'react';

const Total = ({ totalQty, totalPrice }) => {
  return (
    <>
      <strong className="cart-all">
        Total: ₸ <span className='total cart-all'>{totalPrice}</span>.00/-
      </strong>
    </>
  );
};

export default Total;
