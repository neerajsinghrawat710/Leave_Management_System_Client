import { Logout } from '@mui/icons-material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import GroupIcon from '@mui/icons-material/Group'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeProvider'
import Style from '../css/components/Appbar.module.scss'


export default function Appbar({ breadcrumb }) {
    // state
    const { drawerSilde, setDrawerSilde } = useContext(ThemeContext)
    const navigate = useNavigate()

    const [menuVisible, setMenuVisible] = useState(false)
    const [profileAnchor, setProfileAnchor] = useState()

    const acitveUserName = JSON.parse(localStorage.getItem('ss_active_usr'))

    // function
    const handleSidebarToggle = () => {
        setDrawerSilde(!drawerSilde)
    }
    const logOutFunc = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (

        <Stack direction='row' className={drawerSilde ? Style.appbarOpen : Style.appbarClose}>
            {/* app section */}

            <Box sx={{ pl: 2, display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleSidebarToggle}><MenuIcon color='primary' /></IconButton>
                <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} />
                {breadcrumb}
            </Box>


            {/* info section */}
            <Stack sx={{ pr: 2 }} direction={'row'} alignItems={'center'}>
                <IconButton
                    onClick={(event) => {
                        setMenuVisible(true);
                        setProfileAnchor(event.currentTarget);
                    }}>
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                        <Avatar sx={{ bgcolor: 'primary.main' }} >{acitveUserName?.name?.substring(0, 1).toUpperCase()}</Avatar>
                    </Stack>
                </IconButton>
            </Stack>

            {/*  Menu section*/}
            <Menu
                anchorEl={profileAnchor}
                open={menuVisible}
                onClose={() => setMenuVisible(false)}
            >
                <Box sx={{ p: 2, width: 200 }}>
                    <Typography sx={{ mb: 1, }} variant='subtitle2'>👋  Hey,<strong> {acitveUserName?.name?.split(' ')?.[0]}</strong></Typography>
                </Box>
                <Divider />
                <MenuItem onClick={() => navigate("/employee")} ><ListItemIcon  ><GroupIcon color='#000' /></ListItemIcon>Employee</MenuItem>
                <MenuItem onClick={() => navigate("/leave")}><ListItemIcon ><ExitToAppIcon color='#000' /></ListItemIcon>Leave</MenuItem>
                <Divider />
                <MenuItem onClick={logOutFunc}><ListItemIcon ><Logout color='primary' /></ListItemIcon>Logout</MenuItem>
            </Menu >

        </Stack >
    )
}

Appbar.propTypes = {
    breadcrumb: PropTypes.any,
};