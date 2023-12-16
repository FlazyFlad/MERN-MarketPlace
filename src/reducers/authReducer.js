// authReducer.js

const initialState = {
    isAuthenticated: false,
    token: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
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
        default:
            return state;
    }
};

export default authReducer;