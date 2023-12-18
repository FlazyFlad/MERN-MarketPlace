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
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
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
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching car data:', error);
            setIsLoading(false);
          });
      }, [dispatch]);

    console.log(filteresProducts)

    const handleFilterChange = (filters, callback) => {
        const { models, priceRange, searchInput } = filters;


        const updatedFilteredProducts = products.filter((product) => {
            const passesModelFilter = models?.length === 0 || models?.includes(product?.CategoryID.Name);
            const passesPriceFilter =
                product?.Price >= priceRange?.min && product?.Price <= priceRange?.max;
            const passesSearchFilter =
                !searchInput || new RegExp(searchInput, 'i').test(product?.Name);

            return (
                passesModelFilter &&
                passesPriceFilter &&
                passesSearchFilter
            );
        });

        setFilteredProducts(updatedFilteredProducts, callback);
    };

    const handleFilterPageChange = () => {
        setCurrentPage(1);
    };

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <>
            <div className="icons-section">
                <div className="left-icons">
                    <i className="icon">Icon for 3 items per row</i>
                    <i className="icon">Icon for 4 items per row</i>
                    <button> asdfasd</button>
                </div>

                <div className="right-icons">
                    <i className="fas fa-heart"></i>
                    <i className="fas fa-shopping-cart" onClick={(handleToggleCartNav)}></i>
                </div>
            </div>
            <div className="content-section">
                <div className="products-list">
                    <ProductList filteresProducts = {filteresProducts}/>
                </div>

                <div className="filtering-section">
                    <div>
                        <FilterSection
                            onFilterChange={handleFilterChange}
                            modelsData={products?.map((product) => product?.CategoryID.Name)}
                            fuelsData={['Gasoline', 'Electric', 'Hybrid', 'Diesel']}
                            maxPrice={maxPrice}
                            minPrice={minPrice}
                            onFilterPageChange={handleFilterPageChange}
                        />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Catalog;
