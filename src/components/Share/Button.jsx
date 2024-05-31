import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const Button = ({ text, bgColor, textColor, handler = () => { } }) => {
    return (
        <Link to="catalog">
            <button
                className={`${bgColor} ${textColor}
        cursor-pointer hover:scale-105
        duration-300 py-2 px-8 rounded-full
        relative z-10`}
            >
                {text}
            </button>
        </Link>
    );
}

export default Button;
