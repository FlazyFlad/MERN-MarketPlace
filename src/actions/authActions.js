import axios from 'axios';
import Cookies from 'js-cookie';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';
export const clearError = () => ({
    type: 'CLEAR_ERROR',
});

const COOKIE_NAME = 'token_data';

const baseUrl = process.env.REACT_APP_API_URL;
// const baseUrl = 'http://127.0.0.1:3001';

export const register = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/register`, userData);

        dispatch({ type: REGISTER_SUCCESS });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.response.data.message });
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, credentials);

        const token = response.data.token;

        Cookies.set(COOKIE_NAME, token);

        dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
    }
};

export const logout = () => (dispatch) => {
    Cookies.remove(COOKIE_NAME);

    dispatch({ type: LOGOUT_SUCCESS });
};

export const getUserInfo = () => async (dispatch, getState) => {
    try {
        const token = Cookies.get(COOKIE_NAME);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${baseUrl}/auth/user-info`, config);

        dispatch({ type: GET_USER_INFO_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_USER_INFO_FAILURE, payload: error });
    }
};