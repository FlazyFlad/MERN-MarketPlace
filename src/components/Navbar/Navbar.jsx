import { FaCaretDown, FaCartShopping } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';
import DarkMode from './DarkMode';
import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from '../../Context';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { toggleCartNav } from '../../actions/cartActions';

const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const { theme, handleChangeTheme } = useContext(ThemeContext);
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();

    const handleToggleCartNav = () => {
        dispatch(toggleCartNav());
    };

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
        });
    };

    const MenuLinks = [
        {
            id: 1,
            name: "Home",
            link: "/#",
        },
        {
            id: 2,
            name: "Shop",
            link: "/catalog",
        },
        {
            id: 3,
            name: "About",
            link: "/about-us",
        },
    ]

    const DropdownLinks = [
        {
            id: 1,
            name: "Trending Products",
            link: "/#",
        },
        {
            id: 2,
            name: "Best Selling",
            link: "/#",
        },
        {
            id: 3,
            name: "Top Rated",
            link: "/#",
        },
    ]

    const calculateTotalCartQuantity = () => {
        let totalQuantity = 0;

        cartItems.forEach((cartItem) => {
            totalQuantity += cartItem.Quantity;
        });

        return totalQuantity;
    };


    const totalCartQuantity = calculateTotalCartQuantity();

    return (
        <div className="bg-white dark:bg-gray-900
        dark:text-white duration-200 relative z-40">
            <div className="py-4">
                <div className="container flex justify-between
                items-center">
                    {/* Logo and Links section */}
                    <div className="flex items-center gap-4">
                        <a href="#"
                            className="text-primary
                        font-semibold tracking-widest
                        text-2xl uppercase
                        sm:text-3xl"
                        >
                            Eshop
                        </a>
                        {/* Menu Items */}
                        <div className="hidden lg:block">
                            <ul className="flex items-center gap-4">
                                {MenuLinks.map((data, index) => (
                                    <li key={index}>
                                        <Link to={data.link}
                                            href={data.link}
                                            className="inline-block px-4
                                            font-semibold text-gray-500
                                            hover:text-black
                                            dark:hover:text-white duration-200"
                                        >
                                            {data.name}
                                        </Link>
                                    </li>
                                ))}

                                {/* Dropdown */}

                            </ul>

                        </div>
                    </div>

                    {/* Navbar Right section */}
                    <div className="flex justify-between
                    items-center gap-4">
                        {/* Search Bar section */}
                        <div className="relative group hidden
                            sm:block">
                            <input type="text"
                                placeholder="Search"
                                className="
                                search-bar
                                "
                            />
                            <IoMdSearch
                                className="text-xl text-gray-600 group-hover:text-pretty
                                dark:text-gray-400 absolute top-1/2
                                -translate-y-1/2 right-3 duration-200"
                            />
                        </div>

                        {/* Order-button section */}

                        {token ? (
                            <button className="relative">

                                <Link onClick={() => handleLogout()}>
                                    <CiLogin className="text-2xl text-gray-600 dark:text-gray-400" />
                                </Link>
                            </button>
                        ) : (
                            <button className="relative">

                                <Link to="/login">
                                    <CiLogout className="text-2xl text-gray-600 dark:text-gray-400" />
                                </Link>
                            </button>
                        )}

                        {token ? (
                            <button className="relative">
                                <Link to="/catalog">
                                    <FaCartShopping className="text-2xl text-gray-600 dark:text-gray-400" />
                                    {/* {totalCartQuantity > 0 && (
                                        <div className="w-5 h-5 bg-red-500 text-white rounded-full absolute -top-2 -right-2 flex items-center justify-center text-xs">
                                            {totalCartQuantity}
                                            4
                                        </div>
                                    )} */}
                                </Link>
                            </button>
                        ) : (
                            <>
                            </>
                        )}


                        {/* Dark Mode section */}
                        <div>
                            <DarkMode />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
