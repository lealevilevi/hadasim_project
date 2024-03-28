import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { Vaccination } from '../../types/type';
import { Form, Navigate } from 'react-router-dom';
import { addVaccination, getVaccination, getVaccinationById } from '../../service/vaccinationService';
import { PATHS } from '../../api/path';
import { useSelector } from 'react-redux';
import { selectPatient } from '../../redux/selectors/patientSelector';
import { getPatientById2 } from '../../service/patientService';

// תבנית האימות עבור הנתונים
const schema = yup.object().shape({
  Ptientid: yup.string().required(),
  Date_vaccination: yup.array().of(
    yup.object().shape({
      date_of_recived: yup.date().nullable().transform((value, originalValue) => {
        if (originalValue === "") return null;
        return value;
      }),
      manufacturer: yup.string().nullable(),
    })
  ).max(4, 'Vaccination dates cannot exceed 4 entries'),
  date_receiving_positive_result: yup.date().required('תאריך קבלת התוצאה החיובית הוא שדה חובה'),
  date__of_recovery: yup.date().required('תאריך השחרור הוא שדה חובה')
  .when('date_receiving_positive_result', (date_receiving_positive_result, schema) => {
    return schema.min(date_receiving_positive_result, 'תאריך השחרור חייב להיות אחרי תאריך קבלת התוצאה החיובית');
  }),});
// סוג הנתונים
export default function VaccinationForm() {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const[isPatientExist,setIsPatientExist]=useState(false)
  const[isDetailsExist,setIsDetailsExist]=useState(false);
      const handleIdChange = async (e: any) => {
        const value = e.target.value;
        if (value) {
            try {
                if (value.length === 9) {
                    const patient = await getPatientById2(value);
                    if (patient) {
                        setIsPatientExist(true);
                        try {
                            let details = await getVaccinationById(value);
                            if (details) {
                                setIsDetailsExist(true);
                            } else {
                                setIsDetailsExist(false);
                            }
                        } catch (error1: any) {
                          if(error1.response)
                            alert(error1.response);
                        }
                    } else {
                        setIsPatientExist(false);
                    }
                }
            } catch (error1: any) {
              if(error1.response)
                alert(error1?.response?.data);
            }
        } else {
            setIsPatientExist(false);
        }
    };
  const selector = useSelector(selectPatient)
  const onSubmit = async (data: any) => {

    if (data.date_receiving_positive_result === "") {
      data.date_receiving_positive_result = null;
    }
    if (data.date__of_recovery === "") {
      data.date__of_recovery = null;
    }
    // Handle null values for vaccination dates
    data.Date_vaccination = data.Date_vaccination.map((vaccination: any) => ({
      date_of_recived: vaccination.date_of_recived === "" ? null : vaccination.date_of_recived,
      manufacturer: vaccination.manufacturer
    }));
    console.log(data)
    try {
      if(isPatientExist&&!isDetailsExist){
      const coronaDetails = await addVaccination(data)
      console.log(coronaDetails)
      }
      else
      alert('we cannot add your details')
    }
    catch (error: any) {
      if(error.response)
      alert(error.response.data)
    }
    reset();
    return <Navigate to={PATHS.patient} />;
    // Reset the form after submission
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Korona Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <TextField
                label="id"
                variant="outlined"
                fullWidth
                {...register("Ptientid")}
                required
                error={!!errors.Ptientid}
                onChange={handleIdChange}

              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              label="_____Positive Test Date"
              variant="outlined"
              fullWidth
              {...register("date_receiving_positive_result")}
              error={!!errors.date_receiving_positive_result}
              helperText={errors.date_receiving_positive_result?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              label="____recoveryDate"
              variant="outlined"
              defaultValue={null}
              fullWidth
              {...register("date__of_recovery")}
              error={!!errors.date__of_recovery}
              helperText={errors.date__of_recovery?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Vaccination Date"
              type="date"
              {...register("Date_vaccination.0.date_of_recived")}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Manufacturer"
              {...register("Date_vaccination.0.manufacturer")}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Vaccination Date"
              type="date"
              {...register("Date_vaccination.1.date_of_recived")}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Manufacturer"
              {...register("Date_vaccination.1.manufacturer")}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Vaccination Date"
              type="date"
              {...register("Date_vaccination.2.date_of_recived")}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Manufacturer"
              {...register("Date_vaccination.2.manufacturer")}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Vaccination Date"
              type="date"

              {...register("Date_vaccination.3.date_of_recived")}

              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Manufacturer"
              {...register("Date_vaccination.3.manufacturer")}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send
            </Button>
          </Grid>
        </Grid>

      </form>
    </Container>
  );
}


