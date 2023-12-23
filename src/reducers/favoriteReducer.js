
const initialState = {
    favoriteItems: [],
    loading: false,
    isFavoriteNavOpen: false,
    error: null,
};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER_FAVORITES_REQUEST':
        case 'ADD_TO_FAVORITES_REQUEST':
        case 'REMOVE_FROM_FAVORITES_REQUEST':
        case 'CLEAR_FAVORITES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'HANDLE_ERROR_VALUE':
            return {
                ...state,
                error: null,
            };

        case 'FETCH_USER_FAVORITES_SUCCESS':
            return {
                ...state,
                favoriteItems: action.payload,
                loading: false,
                error: null,
            };

        case 'TOGGLE_FAVORITE_NAV':
            return {
                ...state,
                isFavoriteNavOpen: !state.isFavoriteNavOpen,
            };

        case 'ADD_TO_FAVORITES_SUCCESS':
        case 'REMOVE_FROM_FAVORITES_SUCCESS':
        case 'CLEAR_FAVORITES_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
            };

        case 'FETCH_USER_FAVORITES_FAILURE':
        case 'ADD_TO_FAVORITES_FAILURE':
        case 'REMOVE_FROM_FAVORITES_FAILURE':
        case 'CLEAR_FAVORITES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default favoritesReducer;
