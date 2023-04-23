import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import NoDataFoundImg from "../assets/img/noData.jpg"


export default function NoDataFound({ height, }) {

    return (
        <Box sx={{ height: height ? height : "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={NoDataFoundImg} height={"100%"} alt='no_data' />
        </Box>
    )
}

NoDataFound.propTypes = {
    height: PropTypes.string,
};
