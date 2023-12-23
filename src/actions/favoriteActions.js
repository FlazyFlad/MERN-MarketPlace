import axios from 'axios';
import { getUserInfo } from './authActions';

export const FETCH_USER_FAVORITES_REQUEST = 'FETCH_USER_FAVORITES_REQUEST';
export const FETCH_USER_FAVORITES_SUCCESS = 'FETCH_USER_FAVORITES_SUCCESS';
export const FETCH_USER_FAVORITES_FAILURE = 'FETCH_USER_FAVORITES_FAILURE';
export const ADD_TO_FAVORITES_REQUEST = 'ADD_TO_FAVORITES_REQUEST';
export const ADD_TO_FAVORITES_SUCCESS = 'ADD_TO_FAVORITES_SUCCESS';
export const ADD_TO_FAVORITES_FAILURE = 'ADD_TO_FAVORITES_FAILURE';
export const REMOVE_FROM_FAVORITES_REQUEST = 'REMOVE_FROM_FAVORITES_REQUEST';
export const REMOVE_FROM_FAVORITES_SUCCESS = 'REMOVE_FROM_FAVORITES_SUCCESS';
export const REMOVE_FROM_FAVORITES_FAILURE = 'REMOVE_FROM_FAVORITES_FAILURE';
export const CLEAR_FAVORITES_REQUEST = 'CLEAR_FAVORITES_REQUEST';
export const CLEAR_FAVORITES_SUCCESS = 'CLEAR_FAVORITES_SUCCESS';
export const CLEAR_FAVORITES_FAILURE = 'CLEAR_FAVORITES_FAILURE';

export const toggleFavoriteNav = () => ({
    type: 'TOGGLE_FAVORITE_NAV',
});

export const handleErrorValue = () => ({
    type: 'HANDLE_ERROR_VALUE',
});

const baseUrl = process.env.REACT_APP_API_URL;
// const baseUrl = 'http://127.0.0.1:3001';

export const fetchUserFavorites = () => async (dispatch, getState) => {
    try {
        await dispatch(getUserInfo());

        dispatch({ type: FETCH_USER_FAVORITES_REQUEST });

        const { userInfo } = getState().auth;

        const userId = userInfo.user._id;

        const response = await axios.get(`${baseUrl}/favorite/user/${userId}`);

        dispatch({
            type: FETCH_USER_FAVORITES_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_USER_FAVORITES_FAILURE,
            payload: error.message,
        });
    }
};

export const addToFavorites = (ProductID) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_TO_FAVORITES_REQUEST });
        await dispatch(getUserInfo());

        const { userInfo } = getState().auth;

        const UserID = userInfo.user._id;

        const response = await axios.post(`${baseUrl}/favorite/add`, {
            UserID,
            ProductID,
        });

        dispatch(fetchUserFavorites());
        dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: ADD_TO_FAVORITES_FAILURE, payload: error });
    }
};

export const removeFromFavorites = (ProductID) => async (dispatch, getState) => {
    try {
        dispatch({ type: REMOVE_FROM_FAVORITES_REQUEST });
        await dispatch(getUserInfo());

        const { userInfo } = getState().auth;

        const UserID = userInfo.user._id;

        await axios.post(`${baseUrl}/favorite/remove-item`, {
            UserID,
            ProductID,
        });

        dispatch(fetchUserFavorites());
        dispatch({ type: REMOVE_FROM_FAVORITES_SUCCESS });
    } catch (error) {
        dispatch({ type: REMOVE_FROM_FAVORITES_FAILURE, payload: error.message });
    }
};

export const clearFavorites = () => async (dispatch, getState) => {
    dispatch({ type: CLEAR_FAVORITES_REQUEST });
    try {
        await dispatch(getUserInfo());

        const { userInfo } = getState().auth;

        const UserID = userInfo.user._id;

        await axios.post(`${baseUrl}/favorite/clear-favorites`, {
            UserID,
        });

        dispatch(fetchUserFavorites());
        dispatch({ type: CLEAR_FAVORITES_SUCCESS });
    } catch (error) {
        dispatch({ type: CLEAR_FAVORITES_FAILURE, payload: error });
    }
};