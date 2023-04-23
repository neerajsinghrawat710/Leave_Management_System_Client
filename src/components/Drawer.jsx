import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import GroupIcon from '@mui/icons-material/Group'
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from "../assets/img/logo.png"
import { ThemeContext } from '../context/ThemeProvider'
import Style from '../css/components/Drawer.module.scss'



export default function DrawerUI() {
    const { drawerSilde } = useContext(ThemeContext)
    const location = useLocation()?.pathname
    const navigate = useNavigate()

    const sidebarList = [
        { name: "Employee", icon: <GroupIcon fontSize='small' color={location == "/employee" ? "primary" : ''} />, path: '/employee' },
        { name: "Leave", icon: <ExitToAppIcon fontSize='small' color={location == "/leave" ? "primary" : ''} />, path: '/leave' }
    ]

    return (
        <Box className={drawerSilde ? Style.drawerOpen : Style.drawerClose}>

            <Box className={Style.header}>
                <img className={Style.logo_img} src={Logo} alt='logo' onClick={() => navigate("/")} />
            </Box>
            <Divider />

            {/* Leave Management System */}
            <List disablePadding subheader={drawerSilde && <ListSubheader sx={{ fontSize: 17, }} component="div">Dashboard</ListSubheader>}>
                {sidebarList?.map((items, index) => {
                    return (
                        <>
                            <Link key={index} to={items?.path} style={{ textDecoration: 'none', }}>
                                <ListItem disablePadding className={location == items?.path ? Style.actvie_link : Style.non_actvie_link}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {items?.icon}
                                        </ListItemIcon>
                                        {drawerSilde && <ListItemText primary={items?.name} />}
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        </>
                    )
                })}
            </List>
        </Box >
    )
}

