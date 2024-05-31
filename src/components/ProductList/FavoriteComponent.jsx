import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux';
import { clearFavorites, removeFromFavorites, toggleFavoriteNav } from '../../actions/favoriteActions';
import FavoriteItem from './FavoriteItem';

const FavoriteComponent = ({ favoriteItems, handleRemoveItem }) => {
    const isFavoriteNavOpen = useSelector((state) => state.favorite.isFavoriteNavOpen);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);

    const openingFavorite = {
        left: isFavoriteNavOpen ? '0px' : '-100%',
        visibility: isFavoriteNavOpen ? '' : 'hidden',
    };

    const handleTmp = () => {
        return null;
    }

    const handleClearFavorites = () => {
        dispatch(clearFavorites());
    };

    return (
        <>
            <div className={`cart ${theme === "dark" ? "dark-cart-section" : "light-section"}`}>
                <div className={`${theme === "dark" ? "dark-cart-section" : "light-section"} cart-section side-nav`} style={openingFavorite}>
                    <button onClick={() => dispatch(toggleFavoriteNav())}>
                        <i className={`fas fa-times `}></i>
                    </button>
                    <h2 className={`cart-all `}>Favorites</h2>
                    {favoriteItems?.length > 0 ? (
                        <div className="cart-section cart-items">
                            <FavoriteItem
                                favoriteItems={favoriteItems}
                                // handleQuantityChange={handleQuantityChange}
                                handleRemoveItem={handleRemoveItem}
                            />
                        </div>
                    ) : (
                        <span class="empty-cart"
                            style={{
                                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
                            }}
                        >Looks Like You Haven't Added Any Product In The Favorite Section</span>
                    )}
                    <div className="cart-section cart-section final">
                        <div className="cart-section action">
                            <button

                                style={{
                                    border: theme === 'dark' ? '1px solid white' : '1px solid #010101',
                                }}
                                onClick={() => dispatch(toggleFavoriteNav())} className={`btn buy `}>
                                Confirm <i class="fa fa-check-circle-o" style={{ color: "#177245" }}></i>
                            </button>
                            <button
                                style={{
                                    border: theme === 'dark' ? '1px solid white' : '1px solid #010101',
                                }}
                                onClick={() => handleClearFavorites()} className={`btn clear `}>
                                Clear Favorite <i className="fas fa-trash" style={{ color: "#bb342f" }}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default FavoriteComponent;
