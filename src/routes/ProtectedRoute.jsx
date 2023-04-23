import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
    const isAuthenticated = JSON.parse(localStorage.getItem("token"))

    return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute;


ProtectedRoute.propTypes = {
    children: PropTypes.any,
};