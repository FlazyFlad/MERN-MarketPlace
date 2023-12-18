// CartSideNav.js
import React from "react";
import "./CartComponent.css"
import { useDispatch, useSelector } from "react-redux";
import { toggleCartNav } from "../../actions/cartActions";
import Total from "./Total";
import CartItem from "./CartItem";

const CartComponent = ({ cartItems, sideNav, clearCart, buy }) => {
    const isCartNavOpen = useSelector((state) => state.cart.isCartNavOpen);
    const dispatch = useDispatch();

    return (
        <div className="cart">
            <div className={`side-nav${isCartNavOpen ? '-open' : ''}`}>
                <div className="cart-section side-nav" style={{ right: "0px" }}>
                    <button className="cart-section" onClick={() => dispatch(toggleCartNav())}>
                        <i className="fas fa-times"></i>
                    </button>
                    <h2 className="cart-all">Cart</h2>
                    <div className="cart-section cart-items">

                        <CartItem cartItems={cartItems} />

                    </div>
                    <div className="cart-section final">
                        <Total />
                        <div className="cart-section action">
                            <button onClick={() => buy(1)} className="btn buy">
                                Purchase <i className="fas fa-credit-card" style={{ color: "#6665dd" }}></i>
                            </button>
                            <button onClick={() => clearCart()} className="btn clear">
                                Clear Cart <i className="fas fa-trash" style={{ color: "#bb342f" }}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
