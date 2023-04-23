import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, loading: false, data: [], error: "", message: "" }



export const createEmployeeAction = createAsyncThunk(
    'create-employee',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/employee/create-employee`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const createEmployeeSlice = createSlice({
    name: 'create-employee',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(createEmployeeAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(createEmployeeAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(createEmployeeAction.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.error
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
        },

})



export const createEmployeeReducer = createEmployeeSlice.reducer
