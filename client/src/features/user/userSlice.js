import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "./userServices";
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerfromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkApi) => {
    try {
      return await userServices.register(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData, thunkApi) => {
    try {
      return await userServices.login(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk("user/logout", async (thunkApi) => {
  try {
    return await userServices.logout();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getwishList = createAsyncThunk(
  "user/wishlist",
  async (thunkApi) => {
    try {
      return await userServices.getWishlist();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/cart",
  async (cartData, thunkApi) => {
    try {
      return await userServices.addToproductCart(cartData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getproductCart = createAsyncThunk(
  "user/get",
  async (thunkApi) => {
    try {
      return await userServices.getToCart();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });

    //for login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });

    //for logout
    builder
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = "success";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
    //get wish list
    builder
      .addCase(getwishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getwishList.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        state.message = "success";
      })
      .addCase(getwishList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });

    //add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.productCart = action.payload;
        state.message = "success";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });

    // get to cart
       builder.addCase(getproductCart.pending,(state) => {
        state.isLoading = true
    })
    .addCase(getproductCart.fulfilled, (state,action) => {
    state.isError = false;
    state.isLoading = false;
    state.isSuccess = true;
    state.carts = action.payload;
    state.message = "success";
    })
    .addCase(getproductCart.rejected, (state,action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
    })
  },
});

export default userSlice.reducer;
