
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
   isLoading: false,
  orders: [],
  error: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
 .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

// get all orders of shop
.addCase("getAllOrderShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrderShopSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrderShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
})

    // get all orders of shop
 .addCase("adminAllOrdersRequest", (state) => {
      state.adminOrderLoading  = true;
    })
    .addCase("adminAllOrdersSuccess", (state, action) => {
      state.adminOrderLoading  = false;
      state.adminOrders  = action.payload;
    })
    .addCase("adminAllOrdersFailed", (state, action) => {
      state.adminOrderLoading  = false;
      state.error = action.payload;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    })

});



