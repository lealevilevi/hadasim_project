import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from '../../Axios/axios';
import { setUser } from '../../redux/slices/authSlice';
import { setSession } from '../../auth/auth.utils';
import { login } from '../../service/authService';
import { useDispatch } from 'react-redux';
import { User } from '../../types/type';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const dispatch = useDispatch();
    const onSubmit1: SubmitHandler<User> = async (data) => {
        try {
            const authUser = await login(data.id, data.password);
            console.log(authUser)
            dispatch(setUser(authUser));
            
            setSession(authUser);
        } catch (error:any) {
            alert(error.response.data);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit1)}>
                <div>
                    <TextField
                        fullWidth
                        id="id"
                        label="id"
                        type="id"
                        {...register('id', { required: true })}
                        error={!!errors.id}
                        helperText={errors.id ? 'id is required' : ''}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        {...register('password', { required: true })}
                        error={!!errors.password}
                        helperText={errors.password ? 'Password is required' : ''}
                    />
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Log In
                    </Button>
                </div>
            </form>
        </Container>
    );
}
