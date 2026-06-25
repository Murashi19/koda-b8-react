// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage";

import orders from "./orders.js";
import products from "./products.js";
import dashboard from "./dashboard.js";

const rootReducer = combineReducers({
    orders,
    products,
    dashboard,
});

const persistConfig = {
    key: "admin",
    storage,
    whitelist: ["dashboard"],
};

export default persistReducer(persistConfig, rootReducer);