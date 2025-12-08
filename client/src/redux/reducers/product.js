
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  allProducts: [],
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
 .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase("getAllProductsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })


    // .addCase("productCreateRequest", (state) => {
    //   state.isLoading = true;
    // })
    // .addCase("productCreateSuccess", (state, action) => {
    //   state.isLoading = false;
    //   state.products = action.payload;
    //   state.success = true;
    // })
    // .addCase("productCreateFail", (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    //   state.success = false;
    // })
    

    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.product = action.payload;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    
      // get all products of shop dashboard
     .addCase("getAllProductsShopRequest", (state) => {
          state.isLoading = true; 
     })
    .addCase("getAllProductsShopSuccess", (state,action) => {
          state.isLoading = false; 
          state.products = action.payload;
     })
    .addCase("getAllProductsShopFail", (state, action)=>{
          state.isLoading = false; 
          state.error = action.payload;
     })
       // delete all products of shop
    .addCase("deleteProductRequest", (state) => {
          state.isLoading = true;
     })
     .addCase("deleteProductSuccess", (state,action) => {
          state.isLoading = false;
           state.success = true;
          state.message = action.payload; 
     })
       .addCase("deleteProductFail", (state, action) => {
          state.isLoading = false;
          state.error = action.payload; 
          
     })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});


// export const getProductsByCategory = (categoryId) => async (dispatch) => {
//   try {
//     dispatch({ type: "getProductsByCategoryRequest" });

//     const { data } = await axios.get(`${server}/product/category/${categoryId}`);

//     dispatch({
//       type: "getProductsByCategorySuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getProductsByCategoryFail",
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };
