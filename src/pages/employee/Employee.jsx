import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Button, Card, Link, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import LoadingUI from '../../comman/LoadingUI'
import NoDataFound from '../../comman/NoDataFound'
import Appbar from '../../components/Appbar'
import DrawerUI from '../../components/Drawer'
import Body from '../../layout/Body'
import { getEmployeeAction } from '../../redux/toolkit/employee/getEmployee'
import { useStyles } from '../../theme/theme'
import CreateEmployee from './CreateEmployee'


let breadcrumb = (
    <Stack>
        <Breadcrumbs separator={<NavigateNextIcon sx={{ color: '#87CBB9' }} fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" sx={{ color: "#87CBB9" }} color='inherit' href='/employee'>Employee</Link>
        </Breadcrumbs>
        <Typography sx={{ color: "#87CBB9" }} variant='h5'>Leave Management System</Typography>
    </Stack>

)

export default function Employee() {

    const getEmployee = useSelector(state => state.getEmployee)
    const { data, loading } = getEmployee
    const dispatch = useDispatch()


    const classes = useStyles();
    const [pageSize, setPageSize] = useState(25);
    const [createEmp, setCreateEmp] = useState(false)



    const leaveApplicationColumn = [
        {
            field: 's_no',
            headerName: 'S. No.',
            filterable: false,
            headerClassName: 'super-app-theme--header',
            flex: 1,
            renderCell: (index) => index?.api?.getRowIndex(index.row._id) + 1
        },
        {
            field: '_id',
            headerName: 'ID',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'name',
            headerName: 'Name',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'sick_leave_available',
            headerName: 'Sick Leave Available',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'casual_leave_available',
            headerName: 'Casual Leave Available',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'department',
            headerName: 'Department',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'user_name',
            headerName: 'UserName',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
        },
    ]

    useEffect(() => {
        dispatch(getEmployeeAction())
    }, [dispatch])


    return (

        <>
            <Helmet>
                <title>Leave Management System | Employee</title>
            </Helmet>

            <Appbar breadcrumb={breadcrumb} />
            <DrawerUI />
            <Body>

                <Card sx={{ p: 3, bgcolor: '#0A7E6E', color: '#fff' }}>
                    <Typography variant='h6'>Employee section</Typography>
                    <Typography variant='subtitle1'>You can create employee from here.</Typography>
                    <Button sx={{ mt: 2, bgcolor: '#fff', color: '#000' }} variant='contained' onClick={() => setCreateEmp(true)}>Create Employee</Button>
                </Card>


                <Card sx={{ my: 2 }}>
                    <Paper sx={{
                        bgcolor: '#fff',
                        '& .super-app-theme--header': {
                            bgcolor: '#0A7E6E',
                            color: '#fff',
                        },
                    }} elevation={0}>
                        <DataGrid
                            className={classes.root}
                            sx={{
                                border: 0,
                            }}
                            autoHeight
                            rows={data}
                            columns={leaveApplicationColumn}
                            getRowId={(row) => row._id}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                            pagination
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[25, 50, 100]}
                            disableColumnSelector
                            loading={loading && <LoadingUI />}
                            onCellClick={(params) => {
                            }}
                            components={{
                                NoRowsOverlay: () => <NoDataFound />,
                            }}

                        />
                    </Paper>
                </Card>
            </Body>

            {createEmp && <CreateEmployee state={createEmp} setState={setCreateEmp} />}
        </>
    )
}
