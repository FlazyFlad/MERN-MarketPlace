import React, { useState, useEffect, useContext } from 'react';
import DualSlider from './DualSlider';
import './FilterSection.css';
import { ThemeContext } from '../../Context';
import { FaSearch } from "react-icons/fa";

const FilterSection = ({ onFilterChange, modelsData, fuelsData, maxPrice, minPrice, minMileage, maxMileage, onFilterPageChange }) => {
  const { theme } = useContext(ThemeContext);
  const [selectedModelOptions, setSelectedModelOptions] = useState([]);
  const [selectedFuelOptions, setSelectedFuelOptions] = useState([]);
  const [resetSliders, setResetSliders] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: minMileage, max: maxPrice });
  const [selectedMileageRange, setSelectedMileageRange] = useState({ min: maxMileage, max: maxMileage });
  const [searchInput, setSearchInput] = useState('');



  useEffect(() => {
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
    setSelectedMileageRange({ min: minMileage, max: maxMileage });
  }, [maxPrice, maxMileage]);

  const handlePriceChange = (value) => {
    setSelectedPriceRange(value);
  };

  const handleMileageChange = (value) => {
    setSelectedMileageRange(value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };


  const handleApplyFilters = () => {
    const filters = {
      models: selectedModelOptions,
      fuels: selectedFuelOptions,
      priceRange: selectedPriceRange,
      mileageRange: selectedMileageRange,
      searchInput: searchInput,
    };
    onFilterChange(filters);
    onFilterPageChange();
  };

  const handleResetFilters = () => {
    setSelectedModelOptions([]);
    setSelectedFuelOptions([]);
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
    setSelectedMileageRange({ min: minMileage, max: maxMileage });
    setResetSliders(true);
    setSearchInput('');

    const filters = {
      models: [],
      fuels: [],
      priceRange: { min: minPrice, max: maxPrice },
      mileageRange: { min: minMileage, max: maxMileage },
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
      <div key={option} className="form-control border-none bg-transparent">
        <label className="cursor-pointer label">
          <span className={`label-text p-2 ${selectedOptions.includes(option) ? 'text-yellow-500' : ''}`}>{option}</span>
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option, selectedOptions, setSelectedOptions)}
            className="checkbox checkbox-warning"
          />
        </label>
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
    <div className={`${theme ? 'dark-section' : 'light-section'} p-4 rounded-2xl`}>
      <div className="filter-section">
        <div className="flex border-2 items-center rounded-2xl bg-gray-200 w-full">
          <div className="ml-2">
            <FaSearch className="text-gray-500 w-5 h-5" />
          </div>
          <input
            className="flex-grow text-black text-sm p-2 bg-gray-200 border-none rounded-2xl focus:outline-none focus:border-transparent w-full"
            type="text"
            placeholder="Enter the name"
          />

        </div>
      </div>

      <div className="filter-section">
        <h2 className='font-bold text-lg'>Filter by model</h2>
        <div className="checkbox-container">
          {renderCheckboxOptions(modelsData, selectedModelOptions, setSelectedModelOptions)}
        </div>
      </div>

      <div className="filter-section">
        <h2 className='font-bold text-lg'>Filter by fuel</h2>
        <div className="checkbox-container">
          {renderCheckboxOptions(fuelsData, selectedFuelOptions, setSelectedFuelOptions)}
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

      {/*<div className="flex flex-col">
            <h2 className='font-bold text-lg mb-4'>Filter by mileage</h2>
              <div className="flex flex-start mb-8">
                  <DualSlider
                    min={minMileage}
                    max={maxMileage}
                    onChange={handleMileageChange}
                    sliderType="mileage"
                    reset={resetSliders}
                  />
              </div>
          </div>
*/}
      <div className="combined-button">
        <button className="reset-button" onClick={handleResetFilters}>
          Reset
        </button>
        <button className="apply-button" onClick={handleApplyFilters}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSection;