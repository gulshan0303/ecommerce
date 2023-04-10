import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import userServices from "./userServices"

const initialState ={
    user: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const register = createAsyncThunk("user/register",async(userData,thunkApi) => {
     try {
        return await userServices.register(userData)
     } catch (error) {
        return thunkApi.rejectWithValue(error)
     }
})

export const login = createAsyncThunk("user/login",async(userData,thunkApi) => {
    try {
       return await userServices.login(userData)
    } catch (error) {
       return thunkApi.rejectWithValue(error)
    }
})

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(register.pending,(state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state,action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
        })
        .addCase(register.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
        })

        //for login 
        builder.addCase(login.pending,(state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state,action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
        })
        .addCase(login.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
        })
    }

})

export default userSlice.reducer;