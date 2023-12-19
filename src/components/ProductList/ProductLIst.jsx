import "./ProductList.css";
import React, { useContext, useEffect, useState } from "react";
import productData from "../../ProductsData.json";
import { ThemeContext } from "../../Context";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import CartComponent from "./CartComponent";
import { addToCart, fetchUserCart } from "../../actions/CartActions";

const ProductList = ({ filteresProducts }) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartError = useSelector((state) => state.cart.error);
    const isCartNavOpen = useSelector((state) => state.cart.isCartNavOpen);

    useEffect(() => {
        dispatch(fetchUserCart());
    }, [dispatch]);

    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (cartError && cartError.response?.data?.message === "Product already in the cart") {
            setShowNotification(true);
            console.log(cartError)
        }
    }, [cartError]);

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    const handleAddToCart = async (productId) => {
        const quantity = 1;

        dispatch(addToCart(productId, quantity))
    };



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    return (
        <>
            <CartComponent cartItems={cartItems} />
            {showNotification && (
                <>
                    <div className={`notification-bar ${showNotification ? 'show' : ''}`}>
                        Product has already been added
                    </div>
                </>
            )}
            {filteresProducts.map((product) => (
                <div key={product._id} className={`product p-card rounded-2xl ${theme ? "dark-section " : "light-section"}`}>
                    <div className="heart-icon">
                        <i className="fa-solid fa-heart"></i>
                    </div>
                    <div className="cart-section p-img-container">
                        <img className="p-img" src={`${product.ImageURL}`} />
                    </div>
                    <div className="p-details">
                        <div className="cart-section name-fav">
                            <strong className="cart-all product-name">{product.Name}</strong>
                        </div>
                        <div className="cart-section purchase">
                            <p className="cart-all product-price">{product.Price}₸</p>
                            <span className="cart-all btn-add">
                                <div className="cart-section">
                                    <button onClick={() => handleAddToCart(product._id)} className={`cart-all ${theme ? "add-btn-dark" : "add-btn-light"}`}>Add <i className="fas fa-chevron-right"></i></button>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductList;