import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, loading: false, data: [], error: "", message: "" }



export const getLeaveAction = createAsyncThunk(
    'get-leave',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/leave/get-leave`)
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getLeaveSlice = createSlice({
    name: 'get-leave',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(getLeaveAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(getLeaveAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(getLeaveAction.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.error
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
        },

})



export const getLeaveReducer = getLeaveSlice.reducer
