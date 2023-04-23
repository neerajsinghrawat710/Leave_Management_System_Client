import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, Card, CircularProgress, Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import SnackBarUI from '../../comman/SnackBarUI';
import { createEmployeeAction } from '../../redux/toolkit/employee/createEmployee';
import { getEmployeeAction } from '../../redux/toolkit/employee/getEmployee';



// schema
const catSchema = yup.object({
    name: yup.string().required('Employe name is required.'),
    user_name: yup.string().required('Employe username is required.'),
    email: yup.string().required('Employe email is required.'),
    department: yup.string().required('Employe department is required.'),
}).required();

export default function CreateEmployee({ state, setState }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(catSchema) });

    const createEmployee = useSelector(state => state.createEmployee)
    const { status, message } = createEmployee

    const dispatch = useDispatch()


    const [snack, setSnack] = useState(false)

    // fn
    const handleEmployee = async (data) => {
        const createEmp = await dispatch(createEmployeeAction(data))
        if (createEmp?.meta?.requestStatus == "fulfilled") {
            dispatch(getEmployeeAction())
            setState(false)
            reset()
        }
        setSnack(true)
    }

    const handleClose = function () {
        setState(false)
    }


    return (
        <>
            <Modal sx={{ overflow: 'scroll' }} open={state} onClose={handleClose}>
                <Box className='modal_box'>
                    <Card sx={{ width: 400, p: 5 }}>
                        <Typography variant='h5' sx={{ mb: 5 }} align='center'>Create Employe</Typography>
                        <form onSubmit={handleSubmit(handleEmployee)}>
                            <Stack spacing={3}>
                                <TextField type='text' label="Name" variant="outlined" placeholder='Name' {...register('name')} error={errors?.name?.message} helperText={errors?.name?.message} />
                                <TextField type='text' label="User Name" variant="outlined" placeholder='User Name' {...register('user_name')} error={errors?.user_name?.message} helperText={errors?.user_name?.message} />
                                <TextField type='text' label="Email" variant="outlined" placeholder='User Name' {...register('email')} error={errors?.email?.message} helperText={errors?.email?.message} />
                                <Autocomplete disablePortal options={[
                                    'it',
                                    'hr',
                                    'admin'
                                ]}
                                    renderInput={(params) =>
                                        <TextField  {...params} label="Department" {...register('department')} error={errors?.department?.message} helperText={errors?.department?.message} />}
                                />
                                <Stack direction='row' spacing={2}>
                                    <Button variant='contained' type='submit'>Create Employee</Button>
                                    <Button variant='contained' color='error' onClick={handleClose}>Close</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Card>
                </Box>
            </Modal>
            {snack && <SnackBarUI state={snack} setState={setSnack} status={status} message={message} />}
        </>
    )
}



CreateEmployee.propTypes = {
    state: PropTypes.any,
    setState: PropTypes.any
};