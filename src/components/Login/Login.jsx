// src/components/Login.js
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../actions/authActions';
import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import { ThemeContext } from '../../Context';
import Cookies from 'js-cookie';

const Login = () => {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const [credentials, setCredentials] = useState({ Email: '', Password: '' });
    const error = useSelector((state) => state.auth.error);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleInputChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        dispatch(clearError());

        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(credentials));
    };
    
    if (isAuthenticated) {
        return <Navigate to="/catalog" />;
    }

    return (
        <div className={`login-container ${theme ? 'dark-background' : 'light-backrgound'}`}>
            <div className={`form-container ${theme ? 'dark-section' : 'light-section'}`}>
                <h2 className="auth-title">Login to MarketPlace</h2> <br />

                {error && JSON.stringify(error).length < 50 && (
                    <div
                        className="error-render"
                    >
                        <span
                            className="error-mark"
                        >
                            <i className="fa-solid fa-exclamation"></i>
                        </span>
                        {JSON.stringify(error)}
                    </div>
                )}

                <form id="register-form" className="form" onSubmit={handleLogin}>

                    <label>Email Adress</label>
                    <input
                        type="email"
                        name="Email"
                        className={`${theme ? 'dark-background' : 'light-backrgound'}`}
                        placeholder="Email"
                        value={credentials.Email}
                        onChange={handleInputChange}
                        required
                    />
                    
                    <label> Password</label>
                    <input
                        className={`${theme ? 'dark-background' : 'light-backrgound'}`}
                        type="password"
                        name="Password"
                        placeholder="Password"
                        value={credentials.Password}
                        onChange={handleInputChange}
                        required
                    />

                    <button type="submit" className="ctaa-button">
                        Login
                    </button>


                    <p>Don't have an account?
                        <Link style={{ marginLeft: '5px' }} to="/register">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;