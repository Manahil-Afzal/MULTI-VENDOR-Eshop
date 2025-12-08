

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
      isLoading: false,
  allevents: [],
  error: null,
  success: false,
  message: null,
     
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    
      // get all events of shop
     .addCase("getAlleventsShopRequest", (state) => {
          state.isLoading = true; 
     })
    .addCase("getAlleventsShopSuccess", (state,action) => {
          state.isLoading = false; 
          state.allevents = action.payload;
     })
    .addCase("getAlleventsShopFailed", (state, action)=>{
          state.isLoading = false; 
          state.error = action.payload;
     })

       // delete all events of shop
    .addCase("deleteEventRequest", (state) => {
          state.isLoading = true;
     })
   .addCase("deleteEventSuccess", (state, action) => {
  state.isLoading = false;
  state.success = true;
  state.message = action.payload; 
})
.addCase("deleteEventFailed", (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.success = false;
})

     // get all events of shop
     .addCase("getAlleventsRequest", (state) => {
          state.isLoading = true; 
     })
    .addCase("getAlleventsSuccess", (state,action) => {
          state.isLoading = false; 
          state.allevents = action.payload;
     })
    .addCase("getAlleventsFailed", (state, action)=>{
          state.isLoading = false; 
          state.error = action.payload;
     })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
