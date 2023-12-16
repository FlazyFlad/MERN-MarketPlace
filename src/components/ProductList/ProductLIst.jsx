import './ProductList.css';
import React, { useContext } from 'react';
import productData from '../../ProductsData.json';
import { ThemeContext } from '../../Context';


const ProductList = () => {
    const { theme } = useContext(ThemeContext);
    const productList = JSON.parse(JSON.stringify(productData))

    return (
        <>
            {productList.map((product) => (
                <div key={product.id} className={`product rounded-2xl ${theme ? 'dark-section ' : 'light-section'}`}>
                    <div className="image" style={{ backgroundImage: `url(${product.image})` }}>
                        <div className="price">{product.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</div>
                    </div>
                    <div className="details">
                        <h4 className="name">{product.name.toUpperCase()}</h4>
                        <a href={product.website} className="website">{product.websiteFriendly}</a>
                        <div className="button">
                            <span>buy now</span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductList;
