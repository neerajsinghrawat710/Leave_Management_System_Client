import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';

export default function LoadingUI({ justifyContent }) {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: justifyContent ? justifyContent : 'center',
            p: 2
        }}>
            <CircularProgress />
        </Box>
    )
}


LoadingUI.propTypes = {
    justifyContent: PropTypes.string,
};
