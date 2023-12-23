import Cookies from "js-cookie";

const initialState = {
    isAuthenticated: false,
    token: Cookies.get('token_data') || null,
    error: null,
    userInfo: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                // isAuthenticated: true,
                error: null,
            };
        case 'REGISTER_FAILURE':
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
                error: null,
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                error: action.payload,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        case 'GET_USER_INFO_SUCCESS':
            return {
                ...state,
                userInfo: action.payload,
                error: null,
            };
        case 'GET_USER_INFO_FAILURE':
            return {
                ...state,
                userInfo: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;