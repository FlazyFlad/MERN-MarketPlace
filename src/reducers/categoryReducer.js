// categoryReducer.js

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORIES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };

        case 'FETCH_CATEGORIES_SUCCESS':
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null,
            };

        case 'FETCH_CATEGORIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Add more cases for other actions (e.g., category creation, update, deletion)

        default:
            return state;
    }
};

export default categoryReducer;
