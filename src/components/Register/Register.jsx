import './Register.css';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../actions/authActions';
import { ThemeContext } from '../../Context';
import { Link } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const [userData, setUserData] = useState({ Username: '', Email: '', Password: '', Repassword: '' });
    const error = useSelector((state) => state.auth.error);

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        dispatch(clearError());

        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(userData));
    };

    return (
        <div className={`register-container ${theme === "dark" ? 'dark-theme' : 'light-theme'}`}>
            <div className={`form-container ${theme === "dark" ? 'dark-section' : 'light-section'}`}>
                <h2 className="auth-title">Register to MarketPlace</h2> <br />

                {error && (
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
                <form id="register-form" className="form" onSubmit={handleRegister}>

                    <label>Email Adress</label>
                    <input
                        type="email"
                        name="Email"
                        className={`${theme === "dark" ? 'dark-background' : 'light-backrgound'}`}
                        placeholder="Email"
                        value={userData.Email}
                        onChange={handleInputChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        className={`${theme === "dark" ? 'dark-background' : 'light-backrgound'}`}
                        type="password"
                        name="Password"
                        placeholder="Password"
                        value={userData.Password}
                        onChange={handleInputChange}
                        required
                    />

                    <label>Repeat Password</label>
                    <input
                        className={`${theme === "dark" ? 'dark-background' : 'light-backrgound'}`}
                        type="password"
                        name="Repassword"
                        placeholder="Repeat Password"
                        value={userData.Repassword}
                        onChange={handleInputChange}
                        required
                    />

                    <label>Username</label>
                    <input
                        className={`${theme === "dark" ? 'dark-background' : 'light-backrgound'}`}
                        type="text"
                        name="Username"
                        placeholder="Username"
                        value={userData.Username}
                        onChange={handleInputChange}
                        required
                    />

                    <button type="submit" className="ctaa-button">
                        Register
                    </button>
                    <p>Already have an account?
                        <Link style={{ marginLeft: '5px' }} to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;