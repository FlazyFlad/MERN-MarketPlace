const initialState = {
    cartItems: [],
    error: null,
    isCartNavOpen: false,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_CART_NAV':
            return {
                ...state,
                isCartNavOpen: !state.isCartNavOpen,
            };
        case 'ADD_TO_CART_SUCCESS':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                error: null,
            };
        case 'ADD_TO_CART_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'FETCH_USER_CART_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_USER_CART_SUCCESS':
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
            };
        case 'FETCH_USER_CART_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'REMOVE_FROM_CART_SUCCESS':
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
                error: null,
            };
        case 'REMOVE_FROM_CART_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'CHANGE_QUANTITY_SUCCESS':
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.productID === action.payload.productID
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
                error: null,
            };
        case 'CHANGE_QUANTITY_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'CLEAR_CART_SUCCESS':
            return {
                ...state,
                cartItems: [],
                error: null,
            };
        case 'CLEAR_CART_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default cartReducer;
