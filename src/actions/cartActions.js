import axios from 'axios';
import { getUserInfo } from './authActions';

export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
export const REMOVE_FROM_CART_FAILURE = 'REMOVE_FROM_CART_FAILURE';
export const CHANGE_QUANTITY_SUCCESS = 'CHANGE_QUANTITY_SUCCESS';
export const CHANGE_QUANTITY_FAILURE = 'CHANGE_QUANTITY_FAILURE';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';
export const CLEAR_CART_FAILURE = 'CLEAR_CART_FAILURE';

const baseUrl = process.env.REACT_APP_API_URL;

export const FETCH_USER_CART_REQUEST = 'FETCH_USER_CART_REQUEST';
export const FETCH_USER_CART_SUCCESS = 'FETCH_USER_CART_SUCCESS';
export const FETCH_USER_CART_FAILURE = 'FETCH_USER_CART_FAILURE';
export const toggleCartNav = () => ({
    type: 'TOGGLE_CART_NAV',
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

export const changeQuantitySuccess = (cartItem) => ({
    type: CHANGE_QUANTITY_SUCCESS,
    payload: cartItem,
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
        await dispatch(getUserInfo());

        const { userInfo } = getState().auth;

        const UserID = userInfo.user._id;

        const response = await axios.post(`${baseUrl}/cart/add`, {
            UserID,
            ProductID,
            Quantity,
        });

        dispatch(addToCartSuccess(response.data));
    } catch (error) {
        dispatch(addToCartFailure(error));
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
        console.error('Error fetching user cart:', error);
        dispatch({
            type: FETCH_USER_CART_FAILURE,
            payload: error.message,
        });
    }
};


// Async action creators
export const removeFromCart = (cartItem) => async (dispatch) => {
    try {
        // Make an API call to remove the product from the cart
        const response = await axios.post(`${baseUrl}/cart/remove`, cartItem);

        dispatch(removeFromCartSuccess(response.data));
    } catch (error) {
        dispatch(removeFromCartFailure(error));
    }
};

export const changeQuantity = (cartItem) => async (dispatch) => {
    try {
        // Make an API call to change the quantity of the product in the cart
        const response = await axios.post(`${baseUrl}/cart/changeQuantity`, cartItem);

        dispatch(changeQuantitySuccess(response.data));
    } catch (error) {
        dispatch(changeQuantityFailure(error));
    }
};

export const clearCart = () => async (dispatch) => {
    try {
        // Make an API call to clear the entire cart
        await axios.post(`${baseUrl}/cart/clear`);

        dispatch(clearCartSuccess());
    } catch (error) {
        dispatch(clearCartFailure(error));
    }
};

// Implement similar action creators for remove, change quantity, and clear cart
