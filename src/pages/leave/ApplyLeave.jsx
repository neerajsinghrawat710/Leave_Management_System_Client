import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, Card, IconButton, Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import SnackBarUI from '../../comman/SnackBarUI';
import { applyLeavedAction } from '../../redux/toolkit/leave/applyLeave';
import { getLeaveAction } from '../../redux/toolkit/leave/getLeave';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeAction } from '../../redux/toolkit/employee/getEmployee';
import { getEmployeeDetailAction } from '../../redux/toolkit/employee/getEmployeeDetail';
import moment from 'moment';




// schema
const leaveSchema = yup.object({
    user_name: yup.string().required('Leave Type is required.'),
    leave_type: yup.string().required('Leave Type is required.'),
}).required();

export default function ApplyLeave({ state, setState }) {
    // state
    const { register, setError, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(leaveSchema) });

    const getEmployee = useSelector(state => state.getEmployee)
    const { data: empData } = getEmployee
    const applyLeaved = useSelector(state => state.applyLeaved)
    const { error: leaveErr, message: leaveMsg } = applyLeaved

    const dispatch = useDispatch()
    const [snack, setSnack] = useState(false)
    const [date, setDate] = useState({ start: null, end: null, })
    const [department, setDepartment] = useState('')
    const [empID, setEmpID] = useState('')

    // fn
    const handleApplyLeave = async (data) => {

        if (!date?.start) {
            return setError('startDateError', { type: 'custom', message: 'Start date can not be empty' });
        }
        if (!date?.end) {
            return setError('endDateError', { type: 'custom', message: ' End date can not be empty' });
        }

        const applyLeaved = await dispatch(applyLeavedAction({
            department: data?.department,
            leave_type: data?.leave_type,
            emp_id: empID,
            leave_start_date: date?.start,
            leave_end_date: date?.end
        }))

        if (applyLeaved?.meta?.requestStatus == "fulfilled") {
            dispatch(getLeaveAction())
            setState(false)
            reset()
        }
        setSnack(true)
    }

    const handleEmpDetail = async (event, value) => {
        const empDetail = await dispatch(getEmployeeDetailAction(value?._id))
        if (empDetail?.meta?.requestStatus == "fulfilled") {
            setDepartment(empDetail?.payload?.data?.department)
            setEmpID(empDetail?.payload?.data?._id)
        }
    }

    const handleClose = function () {
        setState(false)
    }

    useEffect(() => {
        dispatch(getEmployeeAction())
    }, [dispatch])


    return (
        <>
            <Modal sx={{ overflow: 'scroll' }} open={state} onClose={handleClose}>
                <Box className='modal_box'>
                    <Card sx={{ width: 500, p: 5 }}>
                        <Typography variant='h5' sx={{ mb: 5 }} align='center'>Leave Application</Typography>
                        <form onSubmit={handleSubmit(handleApplyLeave)}>
                            <Stack spacing={3}>
                                <Autocomplete disablePortal options={empData} getOptionLabel={empData => empData?.user_name}
                                    onChange={handleEmpDetail}
                                    renderInput={(params) =>
                                        <TextField  {...params} label="User Name" {...register('user_name')} error={errors?.user_name?.message} helperText={errors?.user_name?.message} />}
                                />
                                {department ? <TextField defaultValue={department} type='text' label="Department" variant="outlined" placeholder='Department' {...register('department')} error={errors?.department?.message} helperText={errors?.department?.message} /> : null}
                                <Autocomplete disablePortal options={[
                                    'sick_leave',
                                    'casual_leave'
                                ]}
                                    renderInput={(params) =>
                                        <TextField  {...params} label="Leave type" {...register('leave_type')} error={errors?.leave_type?.message} helperText={errors?.leave_type?.message} />}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Typography color='#071D45'>Select Date for Leave</Typography>
                                    <Stack direction='row' spacing={2}>
                                        <DatePicker
                                            label="Start Date"
                                            value={date?.start}
                                            onChange={(value) => setDate({ ...date, start: value, end: moment(value).add('d', 1) })}
                                            renderInput={(params) => <TextField {...params}
                                                helperText={errors?.startDateError?.message}
                                                error={errors?.startDateError?.message} />}
                                            minDate={moment()}
                                            maxDate={date?.end}

                                        />
                                        <DatePicker
                                            label="End Date"
                                            value={date?.end}
                                            onChange={(value) => setDate({ ...date, end: value })}
                                            renderInput={(params) => <TextField {...params}
                                                helperText={errors?.endDateError?.message}
                                                error={errors?.endDateError?.message}
                                            />}
                                            minDate={moment(date?.start).add('d', 1)}

                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <Stack direction='row' spacing={2}>
                                    <Button variant='contained' type='submit' >Apply Leave</Button>
                                    <Button variant='contained' color='error' onClick={handleClose}>Close</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Card>
                </Box>
            </Modal>
            {snack && <SnackBarUI state={snack} setState={setSnack} message={leaveMsg} />}
        </>
    )
}



ApplyLeave.propTypes = {
    state: PropTypes.any,
    setState: PropTypes.any
};