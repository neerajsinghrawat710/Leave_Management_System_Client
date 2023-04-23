import { combineReducers } from '@reduxjs/toolkit'
import { adminLoginReducer } from './toolkit/auth/adminLogin'
import { createEmployeeReducer } from './toolkit/employee/createEmployee'
import { getEmployeeReducer } from './toolkit/employee/getEmployee'
import { getEmployeeDetailReducer } from './toolkit/employee/getEmployeeDetail'
import { applyLeavedReducer } from './toolkit/leave/applyLeave'
import { getLeaveReducer } from './toolkit/leave/getLeave'


export const rootReducer = combineReducers({
    adminLogin: adminLoginReducer,
    getEmployee: getEmployeeReducer,
    getEmployeeDetail: getEmployeeDetailReducer,
    createEmployee: createEmployeeReducer,
    getLeave: getLeaveReducer,
    applyLeaved: applyLeavedReducer
})