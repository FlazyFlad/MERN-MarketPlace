import "./ProductList.css";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../Context";
import { useDispatch, useSelector } from "react-redux";
import CartComponent from "./CartComponent";
import { addToCart, fetchUserCart } from "../../actions/cartActions";
import Order from "./Order";
import FavoriteComponent from "./FavoriteComponent";
import { addToFavorites, fetchUserFavorites, handleErrorValue, removeFromFavorites } from "../../actions/favoriteActions";

const ProductList = ({ currentProducts }) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const favoriteItems = useSelector((state) => (state.favorite.favoriteItems))
    const cartError = useSelector((state) => state.cart.error);
    const favoriteError = useSelector((state) => state.favorite.error);

    useEffect(() => {
        dispatch(fetchUserCart());
        dispatch(fetchUserFavorites());
    }, [dispatch]);


    const [showCartNotification, setShowCartNotification] = useState(false);
    const [showFavoriteNotification, setShowFavoriteNotification] = useState(false);

    useEffect(() => {
        if (cartError && cartError.response?.data?.message === "Product already in the cart") {
            setShowCartNotification(true);
        }
    }, [cartError]);

    useEffect(() => {
        if (favoriteError && favoriteError.response?.data?.message === "Product already in favorites") {
            setShowFavoriteNotification(true);
        }
    }, [favoriteError]);

    useEffect(() => {
        if (showCartNotification) {
            const timer = setTimeout(() => {
                setShowCartNotification(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showCartNotification]);

    useEffect(() => {
        if (showFavoriteNotification) {
            const timer = setTimeout(() => {
                setShowFavoriteNotification(false);
                dispatch(handleErrorValue());
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showFavoriteNotification]);

    const handleAddToCart = async (productId) => {
        const quantity = 1;

        dispatch(addToCart(productId, quantity))
    };

    const handleAddToFavorites = async (productId) => {
        dispatch(addToFavorites(productId))
    };

    const handleRemoveItem = (productID) => {
        dispatch(removeFromFavorites(productID._id));
    };

    const totalCartPrice = cartItems.reduce((total, cartItem) => {
        const productPrice = cartItem.ProductID?.Price || 0;
        const quantity = cartItem.Quantity || 0;

        return total + productPrice * quantity;
    }, 0);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const isProductInFavorites = (productId) => {
        return favoriteItems.some((favoriteItem) => favoriteItem.ProductID._id === productId);
    };

    return (
        <>
            <FavoriteComponent favoriteItems={favoriteItems} handleRemoveItem={handleRemoveItem} />
            <CartComponent cartItems={cartItems} totalCartPrice={totalCartPrice} />

            {showCartNotification && (
                <>
                    <div className={`notification-bar ${showCartNotification ? 'show' : ''}`}>
                        Product has already been added to the Cart
                    </div>
                </>
            )}

            {showFavoriteNotification && (
                <>
                    <div className={`notification-bar ${showFavoriteNotification ? 'show' : ''}`}>
                        Product has already been added to the Favorites
                    </div>
                </>
            )}


            <div className="products-list">

                <div class="order-now">
                    <Order totalCartPrice={totalCartPrice} />
                </div>

                {currentProducts.map((product) => (
                    <div key={product._id} className={`product p-card rounded-2xl ${theme === "dark" ? "dark-section " : "light-section"}`}>
                        <div className={`heart-icon ${isProductInFavorites(product._id) ? 'in-favorites' : ''}`}>
                            <i
                                onClick={() => {
                                    const isFavorite = isProductInFavorites(product._id);

                                    if (isFavorite) {
                                        handleRemoveItem(product);
                                    } else {
                                        handleAddToFavorites(product._id);
                                    }
                                }}
                                className="fa-solid fa-heart"></i>
                        </div>
                        <div className="cart-section p-img-container">
                            <img className="p-img" src={`${product.ImageURL}`} alt={product.Name} />
                        </div>
                        <div className="p-details">
                            <div className="cart-section name-fav">
                                <strong className="cart-all product-name">{product.Name}</strong>
                            </div>
                            <div className="cart-section purchase">
                                <p className="cart-all product-price">{product.Price} ₸</p>
                                <span className="cart-all btn-add">
                                    <div className="cart-section">
                                        <button onClick={() => handleAddToCart(product._id)} className={`cart-all ${theme === "dark" ? "add-btn-dark" : "add-btn-light"}`}>Add <i className="fas fa-chevron-right"></i></button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="flex justify-center bg-yellow-500 text-white p-2 rounded-xl">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`${currentPage === number ? 'bg-yellow-600' : 'bg-yellow-500'} transition duration-300 ease-in-out hover:bg-yellow-600 p-2 rounded-lg cursor-pointer`}
                        >
                            {number}
                        </button>
                    ))}
                </div> */}
        </>
    );
};

export default ProductList;