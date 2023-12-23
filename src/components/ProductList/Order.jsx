import React, { useContext, useEffect } from 'react';
import { clearCart, toggleCartNav, toggleOrderDetailsOpen, toggleOrderNow, toggleOrderSuccessOpen } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../Context';

const Order = ({ totalCartPrice }) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => (state.cart.cartItems));
    const isOrderOpen = useSelector((state) => (state.cart.isOrderOpen));
    const isOrderDetailsOpen = useSelector((state) => (state.cart.isOrderDetailsOpen));
    const isOrderSuccessOpen = useSelector((state) => (state.cart.isOrderSuccessOpen));

    const handleToggleCartNav = () => {
        dispatch(toggleOrderNow());
        dispatch(toggleCartNav());
    };

    const handleToggleOrderDetails = () => {
        dispatch(toggleOrderNow());
        dispatch(toggleOrderDetailsOpen());
    };

    const handleToggleOrderSuccess = () => {
        dispatch(toggleOrderDetailsOpen());
        dispatch(toggleOrderSuccessOpen());
    };

    let invoiceStyle = { width: '50px', height: '50px' };

    if (isOrderOpen) {
        invoiceStyle = { width: '70%', height: '70%' };
    } else if (isOrderDetailsOpen) {
        invoiceStyle = { width: '400px', height: '500px' };
    } else if (isOrderSuccessOpen) {
        invoiceStyle = { width: '400px', height: '180px' };
    }
    
    const handleToggleOrderClose = () => {
        dispatch(clearCart());
        dispatch(toggleOrderSuccessOpen());
    };

    return (
        <>
            {isOrderOpen | isOrderDetailsOpen | isOrderSuccessOpen ? (
                <>
                    <div className={`cart-section invoice ${theme ? 'dark-text' : 'dark-text'}`} style={invoiceStyle}>
                        {isOrderOpen && (
                            <>
                                {cartItems?.map((cartItem) => (
                                    <div className="cart-section shipping-items">
                                        <div className="cart-section item-names"><span>{cartItem.Quantity} x {cartItem.ProductID?.Name}</span></div>
                                        <div className="cart-section items-price"><span>{cartItem.ProductID?.Price} ₸</span></div>
                                    </div>
                                ))}
                                <hr />
                                <div className="cart-section payment">
                                    <em>payment</em>
                                    <div>
                                        <p>total amount to be paid:</p><span className="pay">₸ {totalCartPrice}</span>
                                    </div>
                                </div>
                                <div className="cart-section order">
                                    <button onClick={(handleToggleOrderDetails)} className="btn-order btn">Order Now</button>
                                    <button onClick={(handleToggleCartNav)} className="btn-cancel btn">Cancel</button>
                                </div>
                            </>
                        )}
                        {isOrderDetailsOpen && (
                            <>
                                <div className="cart-section order-details">
                                    <em>your order has been placed</em>
                                    <p>Your order-id is : <span>{cartItems[0]._id}</span></p>
                                    <p>your order will be delivered to you in 3-5 working days</p>
                                    <p>you can pay <span>₸ {totalCartPrice}</span> by card or any online transaction method after the products have been dilivered to you</p>
                                </div>
                                <button onClick={(handleToggleOrderSuccess)} className="btn-ok">ok</button>
                            </>
                        )}
                        {isOrderSuccessOpen && (
                            <>
                                <div>
                                    <div className="cart-section order-details"><em className="thanks">Thanks for shopping with us</em></div>
                                    <button onClick={(handleToggleOrderClose)} className="btn-ok">continue</button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            ) : (
                null
            )}
        </>
    );
}

export default Order;
