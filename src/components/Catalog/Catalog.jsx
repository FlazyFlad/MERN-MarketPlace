import { ThemeContext } from '../../Context';
import FilterSection from '../FilterSection/FilterSection';
import ProductList from '../ProductList/ProductLIst';
import './Catalog.css';
import React, { useContext } from 'react';

const Catalog = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <div className="content-section">
                <div className="products-list">
                    <ProductList />
                </div>
                <div className="filtering-section">
                    <div>
                        <FilterSection
                            // onFilterChange={handleFilterChange}
                            // modelsData={carData?.map((car) => car?.name)}
                            // fuelsData={['Gasoline', 'Electric', 'Hybrid', 'Diesel']}
                            // maxPrice={maxPrice}
                            // minPrice={minPrice}
                            // onFilterPageChange ={handleFilterPageChange}
                            /*minMileage={minMileage}
                            maxMileage={maxMileage}*/
                        />
                    </div>
                </div >
            </div >
        </>
    );
}

export default Catalog;
