import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { ThemeContext } from '../../Context';
import './Header.css'

const Header = () => {
    const { theme, handleChangeTheme } = useContext(ThemeContext);


    return (
        <>
            <header className={`header-section ${theme ? 'dark-section' : 'light-section'}`}>
                <nav>
                    <h1>
                        <Link to="/" className={`${theme ? 'dark-text' : 'light-text'}`}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>MarketPlace
                        </Link>
                    </h1>
                    <ul>
                        <li>
                            <Link to="/" className={`${theme ? 'dark-text' : 'light-text'}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog" className={`${theme ? 'dark-text' : 'light-text'}`}>
                                Catalog
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`${theme ? 'dark-text' : 'light-text'}`}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className={`${theme ? 'dark-text' : 'light-text'}`}>
                                Contact Us
                            </Link>
                        </li>
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
