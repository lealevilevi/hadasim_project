
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, List, ListItem, ListItemSecondaryAction, ListItemText, Grid, Avatar } from '@mui/material';
import { deletePatient as deletePatientApi, getPatients as getPatientsApi, updatePatient as updatePatientApi, getPatientById as getPatientByIdApi } from '../../service/patientService';
import { deletePatient, updatePatient, setPatients } from '../../redux/slices/patientSlice';
import { selectPatient } from '../../redux/selectors/patientSelector';
import { Patient } from '../../types/type';
import { OnUpdate1 } from './UpdatePtient';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { PATHS } from '../../api/path';
import SimpleDialogDemo from './patientDetails'
import PatientDetails from './patientDetails';
import Picture from './showImage';
import { useStyles1, useStyles2 } from '../css/style'
import VaccinationForm from '../coronaDetails/addCoronaDetails';
export function Patients() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null); // נוסיף סטייט לשמור על המטופל שנבחר
  const [selectedPatientUpdate, setSelectedPatientUpdate] = useState<Patient | null>(null); // נוסיף סטייט לשמור על המטופל שנבחר


  const patient = useSelector(selectPatient);
  const dispatch = useDispatch();
  const classes1 = useStyles1;
  const classes2 = useStyles2;
  console.log(patient.patients)
  const handlePatientClick = (p: Patient) => {
    setSelectedPatient(p);
  };
  const handleUpdate = (patient: Patient) => {
    setSelectedPatientUpdate(patient);
  };


  const onDelete = async (id: string) => {
    try {
      await deletePatientApi(id);
      dispatch(deletePatient(id));
    }
    catch (error: any) {
      alert(error.response.data)
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        debugger
        console.log("number of patient in the selector: " + patient.patients.length)
        if (patient.patients.length == 0) {
          const patients = await getPatientsApi();
          dispatch(setPatients(patients));
        }
      }
      catch (error: any) {
        console.log(error.response.data)
      }
    };
    getData();
  }, [selectedPatientUpdate]);


  return (
    <>
      <div>
        <Grid container spacing={2}>
          {patient.patients.map((p: Patient) => (
            <Grid item xs={12}  key={p.id}>
              <ListItem sx={{ border: '1px solid #e0e0e0', borderRadius: '5px', marginBottom: '10px' }}>
                <ListItemText primary={`${p.first_name} ${p.last_name}`} secondary={`Patient ID: ${p.id}`} />
                <ListItemSecondaryAction>
                  <Button variant="outlined" onClick={() => onDelete(p.id)} color="error">Delete</Button>
                  <Button onClick={() => handlePatientClick(p)} variant="outlined" color="primary">Show More</Button>
                  <Button onClick={() => handleUpdate(p)} variant="outlined" color="primary">Update personal details</Button>
                </ListItemSecondaryAction>
              </ListItem>
            </Grid>
          ))}
          <OnUpdate1 patient={selectedPatientUpdate} onClose={() => setSelectedPatientUpdate(null)} />
          <PatientDetails patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
        </Grid>
      </div >
    </>
  );
}
export default Patients;





