import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from '../../Context';
import './Header.css'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';

const Header = () => {
    const { theme, handleChangeTheme } = useContext(ThemeContext);
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });
    };
    
    return (
        <>
            <header className={`header-section ${theme === "dark" ? 'dark-section' : 'light-section'}`}>
                <nav>
                    <h1 style={{ marginLeft: '5%' }}>
                        <Link to="/" className={`${theme === "dark" ? 'dark-text' : 'light-text'}`}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>MarketPlace
                        </Link>
                    </h1>
                    <ul>
                        <li>
                            <Link to="/" className={`${theme === "dark" ? 'dark-text' : 'light-text'}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog" className={`${theme === "dark" ? 'dark-text' : 'light-text'}`}>
                                Catalog
                            </Link>
                        </li>
                        <li>
                            <Link to="/about-us" className={`${theme === "dark" ? 'dark-text' : 'light-text'}`}>
                                About Us
                            </Link>
                        </li>
                        {token ? (
                            <li>
                                <Link onClick={() => handleLogout()} className={`${theme === "dark" ? 'dark-text' : 'light-text'}`}>
                                    Log Out
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/register" className={`${theme === "dark" ? 'dark-text' : 'light-text'}`}>
                                    Sign Up
                                </Link>
                            </li>
                        )}

                        <li>
                            {!theme && (
                                <i className="fa fa-moon-o theme-icon" onClick={handleChangeTheme} aria-hidden="true"></i>
                            )}
                            {theme && (
                                <i className="fa fa-sun-o theme-icon" onClick={handleChangeTheme} aria-hidden="true"></i>
                            )}
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;
