import { Alert, Snackbar } from '@mui/material'
import PropTypes from 'prop-types';
import React from "react"

export default function SnackBarUI({ state, setState, message, status }) {

    // fun
    const closeSnackFunc = () => {
        setState(false)
    }

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }} open={state} autoHideDuration={3000} onClose={closeSnackFunc}>
            <Alert onClose={closeSnackFunc} severity={status == 201 || status == 200 ? "success" : "error"} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
SnackBarUI.propTypes = {
    state: PropTypes.any,
    setState: PropTypes.any,
    message: PropTypes.any,
    status: PropTypes.any,
};