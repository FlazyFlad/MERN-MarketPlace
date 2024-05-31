import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../Context';
import { toggleCartNav } from '../../actions/cartActions';
import FilterSection from '../FilterSection/FilterSection';
import ProductList from '../ProductList/ProductLIst';
import './Catalog.css';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { fetchProducts } from '../../actions/productActions';
import { toggleFavoriteNav } from '../../actions/favoriteActions';

const Catalog = () => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const isCartNavOpen = useSelector((state) => state.cart.isCartNavOpen);
    const isLoadingCart = useSelector((state) => state.cart.isLoadingCart);
    const favoriteItems = useSelector((state) => (state.favorite.favoriteItems))
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('');

    const handleSortChange = (option) => {
        setSortBy(option);
    };

    const handleToggleCartNav = () => {
        dispatch(toggleCartNav());
    };

    const handleToggleFavoritNav = () => {
        dispatch(toggleFavoriteNav());
    };

    const priceValues = products?.map((product) => product?.Price).filter((value) => !isNaN(value)) || [];
    const maxPrice = Math.max(...priceValues);
    const minPrice = Math.min(...priceValues);

    const [filteresProducts, setFilteredProducts] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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

        setCurrentPage(1);
        setFilteredProducts(updatedFilteredProducts, callback);
    };

    const handleFilterPageChange = () => {
        setCurrentPage(1);
    };

    const sortedProducts = useMemo(() => {
        switch (sortBy) {
            case 'descending':
                return [...filteresProducts].sort((a, b) => b.Price - a.Price);
            case 'ascending':
                return [...filteresProducts].sort((a, b) => a.Price - b.Price);
            case 'popularity':
                return [...filteresProducts].sort((a, b) => b.StockQuantity - a.StockQuantity);
            default:
                return filteresProducts;
        }
    }, [sortBy, filteresProducts]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedProducts?.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const calculateTotalCartQuantity = () => {
        let totalQuantity = 0;

        cartItems.forEach((cartItem) => {
            totalQuantity += cartItem.Quantity;
        });

        return totalQuantity;
    };

    const totalCartQuantity = calculateTotalCartQuantity();

    return (
        <>
            <div className="catalog-container">
                {!isLoading && !isLoadingCart ? (
                    <>

                        <div className="icons-section">
                            <div className="left-icons">
                                <div className="sorting-dropdown">
                                    <button className="menu-icon">
                                        <i className="s-icon fa-solid fa-bars"></i>
                                    </button>
                                    <div className={`dropdown-content dropdown-content${theme === "dark" ? '-dark dark-section' : '-light light-section'}`}>
                                        <div onClick={() => handleSortChange('descending')}>Descending Price</div>
                                        <div onClick={() => handleSortChange('ascending')}>Ascending Price</div>
                                        <div onClick={() => handleSortChange('popularity')}>By Popularity</div>
                                        <div onClick={() => handleSortChange('relevancy')}>By Relevancy</div>
                                    </div>
                                </div>
                            </div>

                            <div className="right-icons">
                                <div className="s-nav" style={{ marginRight: "5px" }}>
                                    <i onClick={(handleToggleFavoritNav)} className={`s-icon fas fa-heart`}></i>
                                    {favoriteItems.length > 0 &&
                                        <span className="s-total-qty">{favoriteItems.length ? favoriteItems.length : ''}</span>
                                    }
                                </div>
                                <div className="s-nav">
                                    <i onClick={(handleToggleCartNav)} className="s-icon fas fa-shopping-cart"></i>
                                    {totalCartQuantity > 0 &&
                                        <span className="s-total-qty">{totalCartQuantity ? totalCartQuantity : ''}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="content-section">
                            <ProductList currentProducts={currentProducts} currentPage={currentPage} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} />

                            <div className="filtering-section">
                                <div>
                                    <FilterSection
                                        onFilterChange={handleFilterChange}
                                        categoriesData={[...new Set(products?.map((product) => product?.CategoryID?.Name))]}
                                        modelsData={[...new Set(products?.map((product) => product?.ModelID?.Name))]}
                                        maxPrice={maxPrice}
                                        minPrice={minPrice}
                                        onFilterPageChange={handleFilterPageChange}
                                    />
                                </div>
                            </div>
                        </div>
                        {!isCartNavOpen &&
                            < div className="pagination-section">
                                {pageNumbers.map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                        }
                    </>
                ) : (
                    <LoadingSpinner />
                )
                }
            </div>
        </>
    )
}

export default Catalog;
