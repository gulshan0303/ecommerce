import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import blogService from "./blogServices"

const initialState ={
    blogs: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const getBlogs = createAsyncThunk("blogs/all",async(thunkApi) => {
     try {
        return await blogService.getblogs()
     } catch (error) {
        return thunkApi.rejectWithValue(error)
     }
})

export const getABlog = createAsyncThunk("blogs/singlePost",async(id,thunkApi) => {
    try {
       return await blogService.getABlog(id)
    } catch (error) {
       return thunkApi.rejectWithValue(error)
    }
})



export const userSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getABlog.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getABlog.fulfilled, (state,action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleBlog = action.payload;
        state.message = "success";
        })
        .addCase(getABlog.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
        })

        //single post
        builder.addCase(getBlogs.pending,(state) => {
            state.isLoading = true
        })
        .addCase(getBlogs.fulfilled, (state,action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
        state.message = "success";
        })
        .addCase(getBlogs.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
        })

    }

})

export default userSlice.reducer;