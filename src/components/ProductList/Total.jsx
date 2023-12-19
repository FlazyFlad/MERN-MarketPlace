// Total.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../Context';

const Total = ({ totalQty, totalPrice }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <strong className={`cart-all ${theme ? 'dark-text' : 'dark-text'}`}>
        Total: ₸ <span className='total cart-all'>{totalPrice}</span>.00/-
      </strong>
    </>
  );
};

export default Total;
