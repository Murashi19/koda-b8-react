import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage"

import orders from "./orders.js"
import products from "./products.js";
import dashboard from "./dashboard.js";

const persistConfig = {
    key: "admin",
    storage,
    whitelist: ["dashboard"],
};

const reducer = combineReducers({
    orders: persistReducer(persistConfig, orders),
    products: persistReducer(persistConfig, products),
    dashboard: persistReducer(persistConfig, dashboard),
})

export default reducer;