import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./DualSlider.css";

const DualSlider = ({ min, max, onChange, sliderType, reset }) => {
    
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    useEffect(() => {
        if (reset) {
          setMinVal(min);
          setMaxVal(max);
        }
      }, [reset, min, max]);

    // Convert to percentage
    const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

    // Set width of the range to decrease from the left side
    useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
    }
    }, [minVal, maxVal, min, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
    }
    }, [maxVal, minValRef, getPercent]);

    useEffect(() => {
        onChange({ min: minVal, max: maxVal, sliderType });
    }, [minVal, maxVal, sliderType]);

    
return (
    <div className="flex self-start w-full mb-4">
        <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
            }}
            className="thumb thumb--left"
            style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
            }}
            className="thumb thumb--right"
        />

        <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            <div className="slider__left-value">{minVal}</div>
            <div className="slider__right-value">{maxVal}</div>
        </div>
    </div>
);
};

DualSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    sliderType: PropTypes.string.isRequired,
    reset: PropTypes.bool,
};

export default DualSlider;
