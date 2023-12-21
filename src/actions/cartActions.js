import axios from 'axios';
import { getUserInfo } from './authActions';

export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
export const REMOVE_FROM_CART_FAILURE = 'REMOVE_FROM_CART_FAILURE';
export const CHANGE_QUANTITY_SUCCESS = 'CHANGE_QUANTITY_SUCCESS';
export const CHANGE_QUANTITY_FAILURE = 'CHANGE_QUANTITY_FAILURE';
export const CHANGE_QUANTITY_REQUEST = 'CHANGE_QUANTITY_REQUEST';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';
export const CLEAR_CART_FAILURE = 'CLEAR_CART_FAILURE';

const baseUrl = process.env.REACT_APP_API_URL;
// const baseUrl = 'http://127.0.0.1:3001';

export const FETCH_USER_CART_REQUEST = 'FETCH_USER_CART_REQUEST';
export const FETCH_USER_CART_SUCCESS = 'FETCH_USER_CART_SUCCESS';
export const FETCH_USER_CART_FAILURE = 'FETCH_USER_CART_FAILURE';
export const toggleCartNav = () => ({
    type: 'TOGGLE_CART_NAV',
});

export const addToCartStart = () => ({
    type: 'ADD_TO_CART_START',
});

export const addtoCartEnd = () => ({
    type: 'ADD_TO_CART_END',
});

export const addToCartSuccess = (cartItem) => ({
    type: ADD_TO_CART_SUCCESS,
    payload: cartItem,
});

export const addToCartFailure = (error) => ({
    type: ADD_TO_CART_FAILURE,
    payload: error,
});

export const removeFromCartSuccess = (cartItem) => ({
    type: REMOVE_FROM_CART_SUCCESS,
    payload: cartItem,
});

export const removeFromCartFailure = (error) => ({
    type: REMOVE_FROM_CART_FAILURE,
    payload: error,
});

export const changeQuantityRequest = () => ({
    type: CHANGE_QUANTITY_REQUEST,
});

export const changeQuantitySuccess = () => ({
    type: CHANGE_QUANTITY_SUCCESS,
});

export const changeQuantityFailure = (error) => ({
    type: CHANGE_QUANTITY_FAILURE,
    payload: error,
});

export const clearCartSuccess = () => ({
    type: CLEAR_CART_SUCCESS,
});

export const clearCartFailure = (error) => ({
    type: CLEAR_CART_FAILURE,
    payload: error,
});

export const addToCart = (ProductID, Quantity) => async (dispatch, getState) => {
    try {
        dispatch(addToCartStart());
        await dispatch(getUserInfo());

        const { userInfo } = getState().auth;

        const UserID = userInfo.user._id;

        const response = await axios.post(`${baseUrl}/cart/add`, {
            UserID,
            ProductID,
            Quantity,
        });
        dispatch(fetchUserCart());
        dispatch(addtoCartEnd());
        dispatch(addToCartSuccess(response.data));
    } catch (error) {
        dispatch(addToCartFailure(error));
        dispatch(addtoCartEnd());
    }
};

export const changeQuantity = (ProductID, NewQuantity) => async (dispatch, getState) => {
    dispatch(addToCartStart());
    dispatch(changeQuantityRequest());
    try {
        await dispatch(getUserInfo());

        const { userInfo } = getState().auth;

        const UserID = userInfo.user._id;

        await axios.post(`${baseUrl}/cart/change-quantity`, {
            UserID,
            ProductID,
            NewQuantity,
        });
        dispatch(fetchUserCart());
        dispatch(addtoCartEnd());
        dispatch(changeQuantitySuccess());
    } catch (error) {
        dispatch(changeQuantityFailure(error.message));
        dispatch(addtoCartEnd());
    }
};


export const fetchUserCart = () => async (dispatch, getState) => {
    try {
        await dispatch(getUserInfo());

        dispatch({ type: FETCH_USER_CART_REQUEST });

        const { userInfo } = getState().auth;

        const userId = userInfo.user._id;

        const response = await axios.get(`${baseUrl}/cart/user/${userId}`);

        dispatch({
            type: FETCH_USER_CART_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_USER_CART_FAILURE,
            payload: error.message,
        });
    }
};


export const clearCart = () => async (dispatch, getState) => {
    dispatch(addToCartStart());
    dispatch(changeQuantityRequest());
    try {
        await dispatch(getUserInfo());

        const { userInfo } = getState().auth;

        const UserID = userInfo.user._id;

        await axios.post(`${baseUrl}/cart/clear-cart`, {
            UserID,
        });
        dispatch(fetchUserCart());
        dispatch(addtoCartEnd());
        dispatch(changeQuantitySuccess());
    } catch (error) {
        dispatch(changeQuantityFailure(error.message));
        dispatch(addtoCartEnd());
    }
};

export const removeItem = (ProductID) => async (dispatch, getState) => {
    dispatch(addToCartStart());
    dispatch(changeQuantityRequest());
    try {
        await dispatch(getUserInfo());

        const { userInfo } = getState().auth;

        const UserID = userInfo.user._id;

        await axios.post(`${baseUrl}/cart/remove-item`, {
            UserID,
            ProductID,
        });
        dispatch(fetchUserCart());
        dispatch(addtoCartEnd());
        dispatch(changeQuantitySuccess());
    } catch (error) {
        dispatch(changeQuantityFailure(error.message));
        dispatch(addtoCartEnd());
    }
};