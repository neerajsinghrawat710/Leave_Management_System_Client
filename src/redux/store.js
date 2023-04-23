import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { rootReducer } from './combineReducer'



// store managment----->
export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, logger],
})