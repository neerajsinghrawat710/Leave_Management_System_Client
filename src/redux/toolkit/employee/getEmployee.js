import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, loading: false, data: [], error: "", message: "" }



export const getEmployeeAction = createAsyncThunk(
    'get-employee',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`employee/get-employee`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getEmployeeSlice = createSlice({
    name: 'get-employee',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getEmployeeAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(getEmployeeAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(getEmployeeAction.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.error
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
        },

})



export const getEmployeeReducer = getEmployeeSlice.reducer
