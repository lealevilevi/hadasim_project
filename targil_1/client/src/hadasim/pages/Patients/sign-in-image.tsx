
import React, { Children, ReactNode, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../redux/store/store';
import { addPatient, deletePatient, updatePatient, } from '../../redux/slices/patientSlice';
import { addPatient as addPatientApi, deletePatient as deletePatientApi, updatePatient as updatePatientApi } from '../../service/patientService';
import { TextField, Button, Grid, Avatar, Container } from '@mui/material';
import { Patient } from '../../types/type';
import { getDate } from 'date-fns';
function isValidIsraeliID(id:string) {
  // Check if ID is 9 digits
  if (!/^\d{9}$/.test(id)) {
      return false;
  }

  // Calculate check digit
  var sum = 0;
  for (var i = 0; i < 9; i++) {
      var digit = parseInt(id.charAt(i));
      var weight = (i % 2 === 0) ? 1 : 2;
      var product = digit * weight;
      sum += (product > 9) ? product - 9 : product;
  }

  // Check if the remainder is 0
  return sum % 10 === 0;
}
const schema = yup.object().shape({
  id: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  address: yup.object().shape({
    city: yup.string().required(),
    street: yup.string().required(),
    numBulding: yup.number().required().positive().integer()
  }),
  image: yup.string(),
  birthDate: yup.date().required(),
  tel: yup.string(),
  pel: yup.string().required()
});
export default function SignIn() {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [image, setImage] = useState();
  const [imageToShow, setImageToShow] = useState<string | undefined>(undefined)
  const dispatch = useAppDispatch();
  const onSubmit1 = async (data: { first_name: any; id: string; last_name: any; address: { city: any; street: any; numBulding: any; }; birthDate: any; tel?: any; pel: any; image?: any }) =>
  {
    
    if(!isValidIsraeliID(data.id))
    {
        alert("invalid id");
        return
    }
    console.log(data);
    try {
      const patient= {
        address:{
        city: data.address.city,
        street: data.address.street,
        numBulding: data.address.numBulding
        },
        id:data.id,
        first_name:data.first_name,
        last_name:data.last_name,
        tel:data.tel,
        pel:data.pel
      }
      debugger
      const formData = new FormData()
      for (const [key, value] of Object.entries(patient)) 
      {
        if (typeof value === 'object') 
        {
          for (const [nestedKey, nestedValue] of Object.entries(value))
          {
            formData.append(`${key}[${nestedKey}]`, nestedValue as string);
          }
        }

        else 
        {
          formData.append(key, value);
        }
      }
      formData.append('birthDate', data.birthDate.toISOString()); // Convert Date to string
      formData.append('image', image!);
      const newPatient=await addPatientApi(formData)
      dispatch(addPatient(newPatient));
      alert("the registration succeed")
    }
    catch(error:any)
    {
        alert(error.response.data)
    }
  }
    const handleFileChange = (event: any) => {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
      setImageToShow(URL.createObjectURL(selectedImage))
    };


    return (
      <form onSubmit={handleSubmit(onSubmit1)}>

        <Grid container spacing={2}>
          
        {image && <Avatar alt="Uploaded" src={imageToShow} style={{ width: 100, height: 100 }} />}
          <Grid item xs={12}>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              {...register("image")}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload Image
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              type="text"
              {...register("first_name")}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              type="text"
              {...register("last_name")}
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
              helperText={errors.address?.city?.message}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Street"
              type="text"
              {...register("address.street")}
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
              error={!!errors.address?.numBulding}
              helperText={errors.address?.numBulding?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Birth Date"
              type="date"
              {...register("birthDate")}
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
              error={!!errors.pel}
              helperText={errors.pel?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>

        </Grid>
      </form>

    );

    }















