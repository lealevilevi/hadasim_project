import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, Grid, Avatar, DialogActions } from '@mui/material';
import { deletePatient as deletePatientApi, getPatients as getPatientsApi, updatePatient as updatePatientApi } from '../../service/patientService';
import { deletePatient, updatePatient, setPatients } from '../../redux/slices/patientSlice';
import { selectPatient } from '../../redux/selectors/patientSelector';
import { Patient } from '../../types/type';
import { Navigate, useLoaderData, useLocation, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Patients from './getAll';
import { PATHS } from '../../api/path';
import { stat } from 'fs';
import { format } from 'date-fns';
import PatientProps from '../props/prop'
import { useStyles1, useStyles2 } from '../css/style'

export function OnUpdate1(data: PatientProps) {
    const schema = yup.object().shape({
        id: yup.string().required(),
        first_name: yup.string(),
        last_name: yup.string(),
        address: yup.object().shape({
            city: yup.string().required(),
            street: yup.string().required(),
            numBulding: yup.number().required().positive().integer()
        }),
        birthDate:yup.date().nullable(),
        tel: yup.string(),
        pel: yup.string()
    });
    const { register, control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const [selectedPatient,setSelectedPatient]=useState<Patient|null>(null)
    const dispatch = useDispatch()
    const classes1 = useStyles1;
    const classes2 = useStyles2;

    const onUpdate = async (data: any, close: any) => {
        try {
            const updatedPatient = await updatePatientApi(data);
            debugger
            console.log(updatedPatient)
            dispatch(updatePatient(data));
        }
        catch (error: any) 
        {
            if (error.response)
                alert(error.response.data)
        }
        reset()
        close()
    };
    const close = () => {
        data.onClose();
        reset()
    };
    useEffect(() => {
        setSelectedPatient(data.patient);
      }, [data.patient])
    return <>
        <div>
            {data.patient && (
                <Dialog open={!!selectedPatient} onClose={() => close()}>
                    <ListItem key={data.patient.id} style={classes1.listItem}>
                        <form onSubmit={handleSubmit((data) => onUpdate(data, () => close()))}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="First Name"
                                        type="text"
                                        {...register("first_name")}
                                        defaultValue={data.patient?.first_name}
                                        error={!!errors.first_name}
                                        helperText={errors.first_name?.message}
                                        onChange={(e) => setValue("first_name", e.target.value)} // שימוש ב-setValue
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Last Name"
                                        type="text"
                                        {...register("last_name")}
                                        defaultValue={data.patient?.last_name}
                                        error={!!errors.last_name}
                                        helperText={errors.last_name?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="ID"
                                        type="text"
                                        {...register("id")}
                                        value={data.patient.id}
                                        defaultValue={data.patient.id}
                                        error={!!errors.id}
                                        helperText={errors.id?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="City"
                                        type="text"
                                        {...register("address.city")}
                                        error={!!errors.address?.city}
                                        defaultValue={data.patient.address.city}
                                        helperText={errors.address?.city?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Street"
                                        type="text"
                                        {...register("address.street")}
                                        defaultValue={data.patient.address.street}
                                        error={!!errors.address?.street}
                                        helperText={errors.address?.street?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Building Number"
                                        type="text"
                                        {...register("address.numBulding")}
                                        defaultValue={data.patient.address.numBulding}
                                        error={!!errors.address?.numBulding}
                                        helperText={errors.address?.numBulding?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="birth date"
                                        type="date"
                                        {...register("birthDate")}
                                        defaultValue={data.patient?.birthDate ? new Date(data.patient?.birthDate).toISOString().split('T')[0] : ''}
                                        error={!!errors.birthDate}
                                        helperText={errors.birthDate?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Telephone"
                                        type="tel"
                                        {...register("tel")}
                                        defaultValue={data.patient.tel}
                                        error={!!errors.tel}
                                        helperText={errors.tel?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="PEL"
                                        type="text"
                                        {...register("pel")}
                                        defaultValue={data.patient.pel}
                                        error={!!errors.pel}
                                        helperText={errors.pel?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Update Your personal details
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </ListItem>
                    <DialogActions>
                        <Button onClick={() => close()}>Close</Button>
                    </DialogActions>
                </Dialog>)}
        </div>
    </>


};