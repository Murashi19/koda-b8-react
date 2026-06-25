import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/products"; // sesuaikan path kamu

const productSlice = createSlice({
    name: "products",
    initialState: {
        products,
        filters: { search: "", category: "all" },
        pagination: { currentPage: 1, itemsPerPage: 10 },
    },
    reducers: {
        setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload }; },
        setPage: (state, action) => { state.pagination.currentPage = action.payload; },
        updateStock: (state, action) => {
            const { id, stock } = action.payload;
            const p = state.products.find((p) => p.id === id);
            if (p) p.stock = stock;
        },
    },
});

export const { setFilters, setPage, updateStock } = productSlice.actions;
export default productSlice.reducer;