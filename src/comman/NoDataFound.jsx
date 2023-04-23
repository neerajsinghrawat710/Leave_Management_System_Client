import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';


export default function NoDataFound({ height, }) {

    return (
        <Box sx={{ height: height ? height : "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/assets/img/noData.jpg" height={"100%"} />
        </Box>
    )
}

NoDataFound.propTypes = {
    height: PropTypes.string,
};
