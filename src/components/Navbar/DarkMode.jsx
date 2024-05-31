import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";
import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from '../../Context';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';

const DarkMode = () => {
    const { theme, handleChangeTheme } = useContext(ThemeContext);
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });
    };

    const element = document.documentElement; // access to html

    // set theme to localStorage and html element
    React.useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            element.classList.add("dark");
            element.classList.add("dark");
        } else {
            element.classList.remove("light");
            element.classList.remove("dark");
        }
    });

    return (
        <div className="relative">
            <img
                onClick={handleChangeTheme}
                src={LightButton} alt=""
                className={`w-12 cursor-pointer absolute right-0 z-10
            ${theme === "dark" ? "opacity-0" : "opacity-100"}
            transition-all duration-300`}
            />
            <img src={DarkButton} alt=""
                onClick={handleChangeTheme}
                className={`w-12 cursor-pointer `}
            />
        </div>
    );
}

export default DarkMode;
