import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"



const initialState = { status: null, loading: false, data: [], error: "", message: "" }



export const applyLeavedAction = createAsyncThunk(
    'apply-leave',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/leave/apply-leave`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const applyLeavedSlice = createSlice({
    name: 'apply-leave',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(applyLeavedAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(applyLeavedAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(applyLeavedAction.rejected, (state, action) => {
                state.loading = false
                state.error = action?.payload?.error
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
        },

})



export const applyLeavedReducer = applyLeavedSlice.reducer
