import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types';

const ThemeContext = createContext(false)

const ThemeProvider = ({ children }) => {
    const [drawerSilde, setDrawerSilde] = useState(true)
    const [bodySilde, setBodySilde] = useState(true)

    // toogle drawer
    const toggleDrawerFun = () => {
        setDrawerSilde(!drawerSilde)
    }

    // body toogle 
    // toogle drawer
    const toggleBodyFun = () => {
        setBodySilde(!bodySilde)
    }




    return (
        <ThemeContext.Provider value={{
            // state
            drawerSilde: drawerSilde,
            bodySilde: bodySilde,
            setDrawerSilde: setDrawerSilde,

            // function
            toggleBodyFun: toggleBodyFun,
            toggleDrawerFun: toggleDrawerFun
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }



ThemeProvider.propTypes = {
    children: PropTypes.any,
};