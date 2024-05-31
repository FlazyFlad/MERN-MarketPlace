import React, { useContext } from 'react';
import { ThemeContext } from '../../Context';

const FavoriteItem = ({ favoriteItems, handleRemoveItem }) => {

    const { theme } = useContext(ThemeContext)

    return (
        <div>
            {favoriteItems?.map((favorite) => (
                <div key={favorite._id} className={`cart-section cart-item `}
                    style={{
                        borderBottom: theme === 'dark' ? '1px solid whitesmoke' : '1px solid #333',
                    }}
                >
                    <div className='cart-section cart-img'>
                        <img src={favorite.ProductID?.ImageURL} alt={favorite.ProductID?.Name} />
                    </div>
                    <strong className='name'>{favorite.ProductID?.Name}</strong>
                    <span className="qty-change">
                        {/* <div className="cart-section">
                            <button className="btn-qty" onClick={() => handleQuantityChange(favorites.ProductID, favorites.Quantity - 1)}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <p className="qty">{favorites.Quantity}</p>
                            <button className="btn-qty" onClick={() => handleQuantityChange(favorites.ProductID, favorites.Quantity + 1)}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div> */}
                    </span>
                    <button onClick={() => handleRemoveItem(favorite.ProductID)}>
                        <i className='fas fa-trash'></i>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FavoriteItem;