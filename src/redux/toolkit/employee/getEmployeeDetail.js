import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, loading: false, data: [], error: "", message: "" }



export const getEmployeeDetailAction = createAsyncThunk(
    'get-employee',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/employee/get-employee/${data}`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getEmployeeDetailSlice = createSlice({
    name: 'get-employee',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getEmployeeDetailAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(getEmployeeDetailAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(getEmployeeDetailAction.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.error
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
        },

})



export const getEmployeeDetailReducer = getEmployeeDetailSlice.reducer
