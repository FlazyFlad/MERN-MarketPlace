// Total.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../Context';

const Total = ({ totalQty, totalCartPrice }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <strong className={`cart-all ${theme === "dark" ? 'dark-text' : 'dark-text'}`}>
        Total: ₸ <span className='total cart-all'>{totalCartPrice}</span>.00/-
      </strong>
    </>
  );
};

export default Total;
