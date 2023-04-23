import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Card, Grid, Link, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import HomeImg from '../../assets/img/home_img.webp'
import Appbar from '../../components/Appbar'
import DrawerUI from '../../components/Drawer'
import Body from '../../layout/Body'


let breadcrumb = (
    <Stack>
        <Breadcrumbs separator={<NavigateNextIcon sx={{ color: '#87CBB9' }} fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" sx={{ color: "#87CBB9" }} color='inherit' href='/'>Leave</Link>
        </Breadcrumbs>
        <Typography sx={{ color: "#87CBB9" }} variant='h5'>Leave Management System</Typography>
    </Stack>

)



export default function Home() {
    return (

        <>
            <Helmet>
                <title>Leave Management System | Leave</title>
            </Helmet>

            <Appbar breadcrumb={breadcrumb} />
            <DrawerUI />
            <Body>

                <Card sx={{ p: 3 }}>
                    <Grid container alignItems='center'>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <Typography variant='h6'>Welcome to,</Typography>
                                <Typography color='primary' variant='h4'>Leave Management System</Typography>
                            </Stack>
                            <Typography sx={{ mt: 2 }} variant='subtitle1'>
                                Manages all the employee leave and vacation-related
                                activities in single software or solution.
                                It streamlines the entire process and saves a
                                lot of time for both employer and employee.
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <img width={'100%'} src={HomeImg} alt='home_image' />
                        </Grid>

                    </Grid>
                </Card>

            </Body>
        </>
    )
}
