import { server } from "../../server";
import axios from "axios";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message,
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/get-seller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response?.data?.message,
    });
  }
};

// user update information
export const updateInformation =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

//update user address

export const updateUserAddress =
  (country, city, address1, address2, addressType) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          addressType,
        },
        { withCredentials: true }
      );
        dispatch({
            type: "updateUserAddressSuccess",
            payload: {
               updateAddressSuccessMessage: "User address updated successfully!",
               user: data.user,
            }
        })
      } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

  export const deleteUserAddress = (addressId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserAddressRequest" });

    const { data } = await axios.delete(`${server}/user/delete-user-address/${addressId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        user: data.user,
        message: "User address deleted successfully!",
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response?.data?.message,
    });
  }
};


// update user password
export const updateUserPassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserPasswordRequest" });

    const { data } = await axios.put(
      `${server}/user/update-user-password`,
      { oldPassword, newPassword, confirmPassword },
      { withCredentials: true }
    );

    dispatch({
      type: "updateUserPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateUserPasswordFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};


// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};