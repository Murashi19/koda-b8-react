import { createSlice } from "@reduxjs/toolkit";

const loadOrders = () => {
    try {
        const raw = localStorage.getItem("orders");
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
};

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: loadOrders(), // langsung load saat slice dibuat
        filters: { search: "", status: "all" },
        pagination: { currentPage: 1, itemsPerPage: 10 },
    },
    reducers: {
        setOrders: (state, action) => { state.orders = action.payload; },
        updateOrderStatus: (state, action) => {
            const { id, status } = action.payload;
            const order = state.orders.find((o) => o.orderId === id);
            if (order) order.status = status;
        },
        setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload }; },
        setPage: (state, action) => { state.pagination.currentPage = action.payload; },
    },
});

export const { setOrders, updateOrderStatus, setFilters, setPage } = orderSlice.actions;
export default orderSlice.reducer;