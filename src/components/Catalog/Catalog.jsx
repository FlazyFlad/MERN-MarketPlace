import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../Context';
import { toggleCartNav } from '../../actions/cartActions';
import FilterSection from '../FilterSection/FilterSection';
import ProductList from '../ProductList/ProductLIst';
import './Catalog.css';
import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { fetchProducts } from '../../actions/productActions';

const Catalog = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [isLoading, setIsLoading] = useState(true);

    const handleToggleCartNav = () => {
        dispatch({ type: 'TOGGLE_CART_NAV' });
    };

    const priceValues = products?.map((product) => product?.Price).filter((value) => !isNaN(value)) || [];
    const maxPrice = Math.max(...priceValues);
    const minPrice = Math.min(...priceValues);

    const [filteresProducts, setFilteredProducts] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts())
            .then(() => {
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching car data:', error);
                setIsLoading(false);
            });
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const handleFilterChange = (filters, callback) => {
        const { models, categories, priceRange, searchInput } = filters;

        const updatedFilteredProducts = products
            .filter((product) => {
                const passesCategoryModel =
                    categories?.length === 0 ||
                    categories?.includes(product?.CategoryID?.Name);
                const passesPriceFilter =
                    product?.Price >= priceRange?.min &&
                    product?.Price <= priceRange?.max;
                const passesSearchFilter =
                    !searchInput || new RegExp(searchInput, 'i').test(product?.Name);
                const passesModelFilter =
                    models.length === 0 ||
                    models.includes(product?.ModelID?.Name);

                return (
                    passesCategoryModel &&
                    passesPriceFilter &&
                    passesSearchFilter &&
                    passesModelFilter
                );
            })

        setFilteredProducts(updatedFilteredProducts, callback);
    };


    const handleFilterPageChange = () => {
        setCurrentPage(1);
    };

    const calculateTotalQuantity = () => {
        let totalQuantity = 0;

        cartItems.forEach((cartItem) => {
            totalQuantity += cartItem.Quantity;
        });

        return totalQuantity;
    };

    const totalQuantity = calculateTotalQuantity();

    return (
        <>
            {!isLoading ? (
                <>
                    <div className="icons-section">
                        <div className="left-icons">
                            <i className="icon">Icon for 3 items per row</i>
                            <i className="icon">Icon for 4 items per row</i>
                            <button> asdfasd</button>
                        </div>

                        <div className="right-icons">
                            <div className="s-nav" style={{ marginRight: "5px" }}>
                                <i onClick={(handleToggleCartNav)} className={`s-icon fas fa-heart`}></i>
                                {totalQuantity > 0 &&
                                    <span className="s-total-qty">{totalQuantity ? totalQuantity : ''}</span>
                                }
                            </div>
                            <div className="s-nav">
                                <i onClick={(handleToggleCartNav)} className="s-icon fas fa-shopping-cart"></i>
                                {totalQuantity > 0 &&
                                    <span className="s-total-qty">{totalQuantity ? totalQuantity : ''}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="content-section">
                        <div className="products-list">
                            <ProductList filteresProducts={filteresProducts} />
                        </div>

                        <div className="filtering-section">
                            <div>
                                <FilterSection
                                    onFilterChange={handleFilterChange}
                                    categoriesData={products?.map((product) => product?.CategoryID?.Name)}
                                    modelsData={[...new Set(products?.map((product) => product?.ModelID?.Name))]}
                                    maxPrice={maxPrice}
                                    minPrice={minPrice}
                                    onFilterPageChange={handleFilterPageChange}
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    )
}

export default Catalog;
