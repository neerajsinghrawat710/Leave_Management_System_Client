import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../config/authAxios"


const initialState = { status: null, loading: false, data: [], error: "", message: '' }


export const adminLoginAction = createAsyncThunk(
    'admin-login',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/admin/login`, { ...data })
            return res?.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const adminLoginSlice = createSlice({
    name: 'admin-login',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(adminLoginAction.pending, (state) => {
                state.loading = true
            })
            builder.addCase(adminLoginAction.fulfilled, (state, action) => {
                state.loading = false
                state.data = action?.payload?.data
                state.status = action?.payload?.status
                state.message = action?.payload?.message
            })
            builder.addCase(adminLoginAction.rejected, (state, action) => {
                state.loading = false
                state.status = action?.payload?.status
                state.message = action?.payload?.message
                state.error = action?.payload?.message
            })
        },

})



export const adminLoginReducer = adminLoginSlice.reducer


