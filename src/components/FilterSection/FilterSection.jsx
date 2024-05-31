import React, { useState, useEffect, useContext } from 'react';
import DualSlider from './DualSlider';
// import './FilterSection.css';
import { ThemeContext } from '../../Context';
import { FaSearch } from "react-icons/fa";

const FilterSection = ({ onFilterChange, categoriesData, modelsData, maxPrice, minPrice, onFilterPageChange }) => {
  const { theme } = useContext(ThemeContext);
  const [selectedCategoryOptions, setselectedCategoryOptions] = useState([]);
  const [resetSliders, setResetSliders] = useState(false);
  const [selectedModelsOptions, setSelectedModelsOptions] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: minPrice, max: maxPrice });
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
  }, [maxPrice]);

  const handlePriceChange = (value) => {
    setSelectedPriceRange(value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };


  const handleApplyFilters = () => {
    const filters = {
      models: selectedModelsOptions,
      categories: selectedCategoryOptions,
      priceRange: selectedPriceRange,
      searchInput: searchInput,
    };
    onFilterChange(filters);
    onFilterPageChange();
  };

  const handleResetFilters = () => {
    setselectedCategoryOptions([]);
    setSelectedModelsOptions([]);
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
    setResetSliders(true);
    setSearchInput('');

    const filters = {
      models: [],
      categories: [],
      priceRange: { min: minPrice, max: maxPrice },
      searchInput: '',
    };

    onFilterChange(filters);
    onFilterPageChange();
  };


  useEffect(() => {
    setResetSliders(false); // Reset the state after the effect runs
  }, [resetSliders]);


  const renderCheckboxOptions = (options, selectedOptions, setSelectedOptions) => {
    return options?.map((option) => (

      <div class="checkbox-wrapper-13" onChange={() => handleCheckboxChange(option, selectedOptions, setSelectedOptions)}>
        <input checked={selectedOptions.includes(option)} id={option} type="checkbox" />
        <label for={option}>{option}</label>
      </div>

    ));
  };


  const handleCheckboxChange = (option, selectedOptions, setSelectedOptions) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className={`${theme === "dark" ? 'dark-section' : 'light-section'} p-4 rounded-2xl`}>
      <div className="filter-section">
        <h2 className='font-bold text-lg'>Search by Name</h2>
        <div className="flex border-2 items-center rounded-2xl bg-gray-200 w-full">
          <div className="ml-2">
            <FaSearch className="text-gray-500 w-5 h-5" />
          </div>
          <input
            className="flex-grow text-black text-sm p-2 bg-gray-200 border-none rounded-2xl focus:outline-none focus:border-transparent w-full"
            type="text"
            placeholder="Enter the name"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>

      <div className="filter-section">
        <h2 className='font-bold text-lg'>Filter by Category</h2>
        <div className="checkbox-container">
          {renderCheckboxOptions(categoriesData, selectedCategoryOptions, setselectedCategoryOptions)}
        </div>
      </div>

      <div className="filter-section">
        <h2 className='font-bold text-lg'>Filter by Models</h2>
        <div className="checkbox-container">
          {renderCheckboxOptions(modelsData, selectedModelsOptions, setSelectedModelsOptions)}
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className='font-bold text-lg mb-4'>Filter by price</h2>
        <div className="flex flex-start mb-8">
          <DualSlider
            min={minPrice}
            max={maxPrice}
            onChange={handlePriceChange}
            sliderType="price"
            reset={resetSliders}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-md"
          onClick={handleResetFilters}>
          Reset
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleApplyFilters}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSection;