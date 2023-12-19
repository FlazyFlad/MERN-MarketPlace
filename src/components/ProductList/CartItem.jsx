import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../Context';

const CartItem = ({ cartItems, handleQuantityChange, handleRemoveItem }) => {

    const {theme} = useContext(ThemeContext)

    return (
        <div>
            {cartItems?.map((cartItem) => (
                <div key={cartItem._id} className={`cart-section cart-item ${theme ? 'dark-text' : 'dark-text'}`}>
                    <div className='cart-section cart-img'>
                        <img src={cartItem.ProductID?.ImageURL} alt={cartItem.ProductID?.Name} />
                    </div>
                    <strong className='name'>{cartItem.ProductID?.Name}</strong>
                    <span className="qty-change">
                        <div className="cart-section">
                            <button className="btn-qty" onClick={() => handleQuantityChange(cartItem.ProductID, cartItem.Quantity - 1)}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <p className="qty">{cartItem.Quantity}</p>
                            <button className="btn-qty" onClick={() => handleQuantityChange(cartItem.ProductID, cartItem.Quantity + 1)}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </span>
                    <p className='price'>₹ {cartItem.ProductID?.Price * cartItem.Quantity}</p>
                    <button onClick={() => handleRemoveItem(cartItem.ProductID)}>
                        <i className='fas fa-trash'></i>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CartItem;
