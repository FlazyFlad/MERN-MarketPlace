// CartSideNav.js
import React, { useContext } from "react";
import "./CartComponent.css"
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity, toggleCartNav, clearCart, removeItem } from "../../actions/CartActions";
import Total from "./Total";
import CartItem from "./CartItem";
import { ThemeContext } from "../../Context";

const CartComponent = ({ cartItems, sideNav, buy }) => {
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

    const cartDisplay = {
        right: isCartNavOpen ? 'block' : 'none',
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // {`side-nav${isCartNavOpen ? '-open' : ''}`}

    return (
        <div className="cart">
                <div className={`cart-section side-nav`} style={openingCart}>
                <button className="cart-section" onClick={() => dispatch(toggleCartNav())}>
                    <i className={`fas fa-times ${theme ? 'dark-text' : 'dark-text'}`}></i>
                </button>
                <h2 className={`cart-all ${theme ? 'dark-text' : 'dark-text'}`}>Cart</h2>
                {cartItems?.length > 0 ? (
                    <div className="cart-section cart-items">
                        <CartItem
                            cartItems={cartItems}
                            handleQuantityChange={handleQuantityChange}
                            handleRemoveItem={handleRemoveItem}
                        />
                    </div>
                ) : (
                    <span class="empty-cart">Looks Like You Haven't Added Any Product In The Cart</span>
                )}
                <div className="cart-section cart-section final">
                    <Total />
                    <div className="cart-section action">
                        <button onClick={() => buy(1)} className={`btn buy ${theme ? 'dark-text' : 'dark-text'}`}>
                            Purchase <i className="fas fa-credit-card" style={{ color: "#6665dd" }}></i>
                        </button>
                        <button onClick={() => handleClearCart()} className={`btn clear ${theme ? 'dark-text' : 'dark-text'}`}>
                            Clear Cart <i className="fas fa-trash" style={{ color: "#bb342f" }}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
