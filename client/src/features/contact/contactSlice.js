import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import contactService from "./contactService"

const initialState ={
    contact: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const createQuery = createAsyncThunk("contact/query",async(userData,thunkApi) => {
     try {
        return await contactService.createEnquary(userData);
     } catch (error) {
        return thunkApi.rejectWithValue(error)
     }
})


export const userSlice = createSlice({
    name:"contacts",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(createQuery.pending,(state) => {
            state.isLoading = true
        })
        .addCase(createQuery.fulfilled, (state,action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
        state.message = "success";
        })
        .addCase(createQuery.rejected, (state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
        })

        
    }

})

export default userSlice.reducer;