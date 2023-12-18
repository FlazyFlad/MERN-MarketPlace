import React from 'react';

const CartItem = ({ cartItems, removeItem }) => {
    return (
        <div>
            {cartItems.map((cartItem) => (
                <div key={cartItem._id} className='cart-section cart-item'>
                    <div className='cart-section cart-img'>
                        <img src={cartItem.ProductID.ImageURL} alt={cartItem.ProductID.Name} />
                    </div>
                    <strong className='name'>{cartItem.ProductID.Name}</strong>
                    <span className="qty-change">
                        <div className="cart-section">
                            <button className="btn-qty" onClick={() => { /* Handle decrease quantity */ }}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <p className="qty">{cartItem.Quantity}</p>
                            <button className="btn-qty" onClick={() => { /* Handle increase quantity */ }}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </span>
                    <p className='price'>₹ {cartItem.ProductID.Price * cartItem.Quantity}</p>
                    <button onClick={() => removeItem(cartItem.ProductID)}>
                        <i className='fas fa-trash'></i>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CartItem;
