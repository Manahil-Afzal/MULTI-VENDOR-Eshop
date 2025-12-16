import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    isSeller : false,
};

//builder callback notation
export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.loading = false;
      state.isSeller = true;
      state.sellers = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
   
       .addCase("getAllSellersRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAllSellersSuccess", (state, action) => {
      state.loading = false;
      state.adminsellers = action.payload;
    })
     .addCase("getAllSellersFailed", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
     .addCase("clearErrors", (state) => {
      state.error = null;
    })
 
});
