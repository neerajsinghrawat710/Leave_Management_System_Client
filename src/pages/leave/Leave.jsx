import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Button, Card, Link, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import LoadingUI from '../../comman/LoadingUI'
import NoDataFound from '../../comman/NoDataFound'
import Appbar from '../../components/Appbar'
import DrawerUI from '../../components/Drawer'
import Body from '../../layout/Body'
import { getLeaveAction } from '../../redux/toolkit/leave/getLeave'
import { useStyles } from '../../theme/theme'
import ApplyLeave from './ApplyLeave'


let breadcrumb = (
    <Stack>
        <Breadcrumbs separator={<NavigateNextIcon sx={{ color: '#87CBB9' }} fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" sx={{ color: "#87CBB9" }} color='inherit' href='/leave'>Leave</Link>
        </Breadcrumbs>
        <Typography sx={{ color: "#87CBB9" }} variant='h5'>Leave Management System</Typography>
    </Stack>

)



export default function Leave() {

    const dispatch = useDispatch()
    const getLeave = useSelector(state => state.getLeave)
    const { data, loading } = getLeave

    const classes = useStyles();
    const [pageSize, setPageSize] = useState(25);
    const [applyLeave, setApplyLeave] = useState(false)


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
            headerName: 'Employe Name',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => <Typography>{params?.row?.emp_id?.name}</Typography>
        },
        {
            field: 'user_name',
            headerName: 'Employe User Name',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => <Typography>{params?.row?.emp_id?.user_name}</Typography>
        },
        {
            field: 'email',
            headerName: 'Employe Email',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => <Typography>{params?.row?.emp_id?.email}</Typography>
        },
        {
            field: 'leave_type',
            headerName: 'Leave Type',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'leave_applied_days',
            headerName: 'Leave Applied Days',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'leave_start_date',
            headerName: 'Leave Start Date',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => {
                return <Typography>{moment(params?.leave_start_date).format("dd-mm-yyyy")}</Typography>
            },
        },
        {
            field: 'leave_end_date',
            headerName: 'Leave End Date',
            headerClassName: 'super-app-theme--header',
            flex: 1,
            minWidth: 200,
            renderCell: (params) => {
                return <Typography>{moment(params?.leave_end_date).format("dd-mm-yyyy")}</Typography>
            },
        },
    ]

    useEffect(() => {
        dispatch(getLeaveAction())
    }, [dispatch])

    return (

        <>
            <Helmet>
                <title>Leave Management System | Leave</title>
            </Helmet>

            <Appbar breadcrumb={breadcrumb} />
            <DrawerUI />
            <Body>

                <Card sx={{ p: 3, bgcolor: '#0A7E6E', color: '#fff' }}>
                    <Typography variant='h6'>Leave section</Typography>
                    <Typography variant='subtitle1'>You can apply leave from here.</Typography>
                    <Button sx={{ mt: 2, bgcolor: '#fff', color: '#000' }} variant='contained' onClick={() => setApplyLeave(true)}>Apply Leave</Button>
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
                            components={{
                                NoRowsOverlay: () => <NoDataFound />,
                            }}

                        />
                    </Paper>
                </Card>
            </Body>



            {applyLeave && <ApplyLeave state={applyLeave} setState={setApplyLeave} />}
        </>
    )
}
