// CartSideNav.js
import React, { useContext } from "react";
import "./CartComponent.css"
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity, toggleCartNav, clearCart, removeItem, toggleOrderNow } from "../../actions/cartActions";
import Total from "./Total";
import CartItem from "./CartItem";
import { ThemeContext } from "../../Context";

const CartComponent = ({ cartItems, totalCartPrice }) => {
    const { theme } = useContext(ThemeContext)
    const isCartNavOpen = useSelector((state) => state.cart.isCartNavOpen);
    const dispatch = useDispatch();

    const handleRemoveItem = (productID) => {
        dispatch(removeItem(productID._id));
    };

    const handleQuantityChange = (productID, newQuantity) => {
        if (newQuantity < 1 || newQuantity > 10) {
            alert('Quantity should be between 1 and 10.');
            return;
        }

        dispatch(changeQuantity(productID._id, newQuantity));
    };

    const openingCart = {
        right: isCartNavOpen ? '0px' : '-100%',
        visibility: isCartNavOpen ? '' : 'hidden',
    };

    const handleToggleOrderNow = () => {
        if (cartItems.length > 0) {
            dispatch(toggleCartNav());
            dispatch(toggleOrderNow());
        }
        console.log(cartItems)
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // {`side-nav${isCartNavOpen ? '-open' : ''}`}

    return (
        <div className="cart">
            <div className={`cart-section side-nav ${theme === "dark" ? "dark-cart-section" : "light-section"}`} style={openingCart}>
                <button className="cart-section" onClick={() => dispatch(toggleCartNav())}>
                    <i className={`fas fa-times`}></i>
                </button>
                <h2 className={`cart-all`}>Cart</h2>
                {cartItems?.length > 0 ? (
                    <div className="cart-section cart-items">
                        <CartItem
                            cartItems={cartItems}
                            handleQuantityChange={handleQuantityChange}
                            handleRemoveItem={handleRemoveItem}
                        />
                    </div>
                ) : (
                    <span class="empty-cart"
                        style={{
                            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                        }}
                    >Looks Like You Haven't Added Any Product In The Cart</span>
                )}
                <div className="cart-section cart-section final">
                    <Total totalCartPrice={totalCartPrice} />
                    <div className="cart-section action">
                        <button style={{
                            border: theme === 'dark' ? '1px solid white' : '1px solid #010101',
                        }} onClick={() => handleToggleOrderNow()} className={`btn buy`}>
                            Purchase <i className="fas fa-credit-card" style={{ color: "#6665dd" }}></i>
                        </button>
                        <button
                            style={{
                                border: theme === 'dark' ? '1px solid white' : '1px solid #010101',
                            }}
                            onClick={() => handleClearCart()} className={`btn clear`}>
                            Clear Cart <i className="fas fa-trash" style={{ color: "#bb342f" }}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
