
// reducer/user
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};
//builder callback notation
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })
 
    // update user information
    .addCase("updateUserInfoRequest", (state) => {
        state.loading = true;
    })
     .addCase("updateUserInfoSuccess", (state, action) => {
        state.loading = false;
        state.users = action.payload;
    })
     .addCase("updateUserInfoFailed", (state, action) => {
        state.loading = false;
        state.error= action.payload;
    })

    // update user address
   .addCase("updateUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.updateAddressSuccessMessage = action.payload;
      state.users = action.payload.user;
    })
    .addCase("updateUserAddressFailed", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    })
    // delete user address
     .addCase("deleteUserAddressRequest", (state) => {
          state.addressloading = true;
      })
      .addCase("deleteUserAddressSuccess", (state, action) => {
          state.addressloading = false;
          state.users = action.payload;
      })
       .addCase("deleteUserFailed", (state, action) => {
          state.addressloading = false;
          state.error= action.payload;
      })

     // update user password
  .addCase("updateUserPasswordRequest", (state) => {
    state.loading = true;
  })
  .addCase("updateUserPasswordSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload; 
  })
  .addCase("updateUserPasswordFailed", (state, action) => {
    state.loading = false;
    state.error = action.payload; 
  })

    // ADMIN — get all users
    .addCase("getAllUsersRequest", (state) => {
      state.usersLoading = true;
    })
    .addCase("getAllUsersSuccess", (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersFailed", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })

   .addCase("clearErrors", (state) => {
      state.error = null;
    })
     .addCase("clearMessages", (state) => {
      state.updateAddressSuccessMessage = null;
    })
  });

  