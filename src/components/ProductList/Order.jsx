import React, { useEffect } from 'react';
import { clearCart, toggleCartNav, toggleOrderDetailsOpen, toggleOrderNow, toggleOrderSuccessOpen } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

const Order = ({ totalCartPrice }) => {
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
        dispatch(clearCart());
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

    const generatedOrderId = () => {
        const orderId = Math.floor(Math.random() * 1000000);
        return orderId;
    }

    const handleToggleOrderClose = () => {
        dispatch(toggleOrderSuccessOpen());
    };

    return (
        <>
            {isOrderOpen | isOrderDetailsOpen | isOrderSuccessOpen ? (
                <>
                    <div class="cart-section invoice" style={invoiceStyle}>
                        {isOrderOpen && (
                            <>
                                {cartItems?.map((cartItem) => (
                                    <div class="cart-section shipping-items">
                                        <div class="cart-section item-names"><span>{cartItem.Quantity} x {cartItem.ProductID?.Name}</span></div>
                                        <div class="cart-section items-price"><span>{cartItem.ProductID?.Price} ₸</span></div>
                                    </div>
                                ))}
                                <hr />
                                <div class="cart-section payment">
                                    <em>payment</em>
                                    <div>
                                        <p>total amount to be paid:</p><span class="pay">₸ {totalCartPrice}</span>
                                    </div>
                                </div>
                                <div class="cart-section order">
                                    <button onClick={(handleToggleOrderDetails)} class="btn-order btn">Order Now</button>
                                    <button onClick={(handleToggleCartNav)} class="btn-cancel btn">Cancel</button>
                                </div>
                            </>
                        )}
                        {isOrderDetailsOpen && (
                            <>
                                <div class="cart-section order-details">
                                    <em>your order has been placed</em>
                                    <p>Your order-id is : <span>{cartItems[0]._id}</span></p>
                                    <p>your order will be delivered to you in 3-5 working days</p>
                                    <p>you can pay <span>₸ {totalCartPrice}</span> by card or any online transaction method after the products have been dilivered to you</p>
                                </div>
                                <button onClick={(handleToggleOrderSuccess)} class="btn-ok">ok</button>
                            </>
                        )}
                        {isOrderSuccessOpen && (
                            <>
                                <div>
                                    <div class="cart-section order-details"><em class="thanks">Thanks for shopping with us</em></div>
                                    <button onClick={(handleToggleOrderClose)} class="btn-ok">continue</button>
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
