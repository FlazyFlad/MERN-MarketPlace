import {createStore, applyMiddleware, combineReducers} from "redux";
import authReducer from './reducers/authReducer';
import { thunk } from "redux-thunk";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import favoriteReducer from "./reducers/favoriteReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    favorite: favoriteReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;