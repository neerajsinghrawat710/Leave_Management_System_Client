import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeProvider'
import Style from '../css/layout/Body.module.scss'
import PropTypes from 'prop-types';



export default function Body({ children }) {
    // state ---------->
    const { drawerSilde } = useContext(ThemeContext)


    return (
        <Box component="main" className={drawerSilde ? Style.bodyexpend : Style.bodyCollaps} sx={{ p: 3 }}>
            {children}
        </Box>
    )
}


Body.propTypes = {
    children: PropTypes.any,
};