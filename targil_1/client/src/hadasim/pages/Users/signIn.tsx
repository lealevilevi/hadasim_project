import React, { ChangeEvent, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUser as addUserApi } from '../../service/userService';
import { User } from '../../types/type';
import { error } from 'console';
import { PATHS } from '../../api/path';
import { Navigate } from 'react-router-dom';



export default function SignInUser() {

  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const onSubmit = async (data: User) => {
    try{
      const value: User = await addUserApi({
        id: data.id,
        password: data.password
      });
      console.log(value)
      return <Navigate to={PATHS.login} />
    }
    catch(error:any){
        alert(error.response.data);

    }
  };

  return (
    <Container maxWidth="sm" >
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            Sign In
          </Button>
        </div>
      </form>
    </Container>

  );
}
