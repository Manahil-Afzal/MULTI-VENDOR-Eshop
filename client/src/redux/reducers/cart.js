// import {createReducer} from "@reduxjs/toolkit";

// const initialState = {
//       cart: localStorage.getItem("cartItems")
//        ? JSON.parse(localStorage.getItem("cartItems"))
//        : [],
// };

// export const cartReducer = cartReducer (initialState, {
//      addToCart : (state,action) =>{
//         const item = action.payload;
//         const isItemExist = state.cart.find((i) = i._id === item._id);


//         if (isItemExist) {
//             return {
//                  ...state,
//                   cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
//             };
//         } else{
//             return {
//                 ...state,
//                 cart: [...state.cart, item],
//             };
//         }
//      },
//          removeFromCart: (state, action) => {
//             return {
//                 ...state,
//                 cart: state.cart.filter((i) => i._id !== action.payload),
//             };
//          },
// });


import { createReducer } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

// Reducer using builder callback
export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);

      if (isItemExist) {
        state.cart = state.cart.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.cart.push(item);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })
    .addCase("removeFromCart", (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    });
});

// Optional: async actions (thunks)
export const addToCartAction = (data) => async (dispatch) => {
  dispatch({ type: "addToCart", payload: data });
  return data;
};

export const removeFromCartAction = (data) => async (dispatch) => {
  dispatch({ type: "removeFromCart", payload: data._id });
  return data;
};
