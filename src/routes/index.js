import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../pages/auth/Login';
import Employee from '../pages/employee/Employee';
import Home from '../pages/home/Home';
import Leave from '../pages/leave/Leave';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';


export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/employee" element={<ProtectedRoute><Employee /></ProtectedRoute>} />
                <Route path="/leave" element={<ProtectedRoute><Leave /></ProtectedRoute>} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}
