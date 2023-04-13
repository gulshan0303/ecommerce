import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import productService from "./productService"

const initialState ={
    products: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const getAllProducts = createAsyncThunk("product/all",async(thunkApi) => {
     try {
        return await productService.getProducts()
     } catch (error) {
        return thunkApi.rejectWithValue(error)
     }
})

export const getAProduct = createAsyncThunk("product/single",async(id,thunkApi) => {
    try {
       return await productService.getAProduct(id)
    } catch (error) {
       return thunkApi.rejectWithValue(error)
    }
})

export const AddwishList = createAsyncThunk("product/wishlist",async(productId,thunkApi) => {
    try {
       return await productService.addWishlist(productId)
    } catch (error) {
       return thunkApi.rejectWithValue(error)
    }
})



export const userSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getAllProducts.fulfilled, (state,action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.message = "success";
        })
        .addCase(getAllProducts.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
        })

        //wishList

        builder.addCase(AddwishList.pending,(state) => {
            state.isLoading = true
        })
        .addCase(AddwishList.fulfilled, (state,action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.AddwishList = action.payload;
        state.message = "success";
        })
        .addCase(AddwishList.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
        })

        builder.addCase(getAProduct.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getAProduct.fulfilled, (state,action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.message = "success";
        })
        .addCase(getAProduct.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
        })
    }

})

export default userSlice.reducer;