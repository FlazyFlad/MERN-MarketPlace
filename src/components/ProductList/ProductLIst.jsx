import "./ProductList.css";
import React, { useContext, useEffect, useState } from "react";
import productData from "../../ProductsData.json";
import { ThemeContext } from "../../Context";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import { addToCart, fetchUserCart } from "../../actions/cartActions";
import CartComponent from "./CartComponent";
import { toggleCartNav } from "../../actions/cartActions";

const ProductList = ({filteresProducts}) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const productList = JSON.parse(JSON.stringify(productData))
    const products = useSelector((state) => state.product.products);
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);
    const isCartNavOpen = useSelector((state) => state.cart.isCartNavOpen);
    const cartItems = useSelector((state) => state.cart.cartItems);



    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchUserCart());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        const productId = product._id;
        const quantity = 1;

        dispatch(addToCart(productId, quantity));
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
            {filteresProducts.map((product) => (
                <div key={product._id} className={`product p-card rounded-2xl ${theme ? "dark-section " : "light-section"}`}>
                    <div className="heart-icon">
                        <i className="fa-solid fa-heart"></i>
                    </div>
                    <div className="cart-section p-img-container">
                        <img className="p-img" src={`${product.ImageURL}`} />
                    </div>
                    <div className="p-details">
                        <div class="cart-section name-fav">
                            <strong class="cart-all product-name">{product.Name}</strong>
                        </div>
                        <div className="cart-section purchase">
                            <p className="cart-all product-price">₹ 71900</p>
                            <span className="cart-all btn-add">
                                <div className="cart-section">
                                    <button className={`cart-all ${theme ? "add-btn-dark" : "add-btn-light"}`}>Add <i className="fas fa-chevron-right"></i></button>
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