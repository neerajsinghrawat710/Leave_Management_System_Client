import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Card, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import Logo from "../../assets/img/logo.png";
import SnackBarUI from '../../comman/SnackBarUI';
import Style from "../../css/pages/auth/Login.module.scss";
import { adminLoginAction } from '../../redux/toolkit/auth/adminLogin';


// schema
const loginSchema = yup.object({
    email: yup.string().required('Email is required.'),
    password: yup.string().required('Password is required.'),
}).required();


export default function Login() {
    // state
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const adminLogin = useSelector(state => state.adminLogin)
    const { status, message, loading } = adminLogin




    const [snack, setSnack] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // fn
    const loginFunc = async (data) => {
        const loginData = await dispatch(adminLoginAction(data))

        if (loginData?.meta?.requestStatus == "fulfilled") {
            localStorage.setItem("token", JSON.stringify(loginData?.payload?.token))
            setSnack(true)
            navigate('/');
        }
        setSnack(true)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/survey')
        }
    }, [])


    return (
        <>
            <Box className={Style.login}>
                <img src={Logo} alt='logo' width='5%' />
                <Typography sx={{ mb: 3 }} variant='h6'>Leave Management System</Typography>
                <Card sx={{ width: 600, p: 5 }}>
                    <Typography variant='h5' sx={{ mb: 5 }} align='center'>LOGIN</Typography>
                    <form onSubmit={handleSubmit(loginFunc)}>
                        <Stack spacing={3}>
                            <TextField type='email' label="Email" variant="outlined" placeholder='Email' {...register('email')} error={errors?.email?.message} helperText={errors?.email?.message} />
                            <FormControl variant="outlined">
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    {...register('password')} error={errors?.password?.message}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {!showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Button variant='contained' disabled={loading} fullWidth type='submit'>{loading ? <CircularProgress sx={{ color: '#fff' }} /> : 'Login'}</Button>
                        </Stack>
                    </form>
                </Card>
            </Box>

            <SnackBarUI state={snack} setState={setSnack} status={status} message={message} />
        </>
    )
}
