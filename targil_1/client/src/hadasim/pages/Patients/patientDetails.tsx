import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Patient, Vaccination } from '../../types/type';
import { useEffect, useState } from 'react';
import { DialogActions, DialogContent, colors } from '@mui/material';
import { getPatientById } from '../../service/patientService';
import { getVaccinationById } from '../../service/vaccinationService';
import { date } from 'yup';
import { format } from 'date-fns';
import Picture from './showImage';


import PatientProps from '../props/prop'
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../api/path';

const PatientDetails: React.FC<PatientProps> = ({ patient, onClose }) => {
  const [selectedCorona1, setSelectedCorona1] = useState<Vaccination | null>(null);
  const { reset } = useForm({});
  useEffect(() => {
    const getData = async () => {
      if (patient){
        try 
        {
          const selectdetails= await getVaccinationById(patient.id);
          setSelectedCorona1(selectdetails|| null);
        }
        catch (error: any) 
        {
            alert(error.response.data)
        }
      }
    };

    getData();
  }, [patient])
  console.log(selectedCorona1)
  const close = () => {
    onClose();
    reset()

};
  return (
    <Dialog open={!!patient} onClose={() => close()}>
      {patient && (
        <DialogContent>
          <Picture id={patient.id}/>
          <Typography variant="h6" >{`${patient.first_name} ${patient.last_name}`}</Typography>
          <Typography variant="body2">PatientId: {patient.id}</Typography>
          <Typography variant="body2">adress: {patient.address ? `${patient.address.city} , ${patient.address.street} ${patient.address.numBulding}` : 'un known address'}</Typography>
          <Typography variant="body2">tel_phone: {patient.tel}</Typography>
          <Typography variant="body2">mobile: {patient.pel}</Typography>
         {patient.birthDate&&
          <Typography variant="body2">birthDate: {format(patient.birthDate, 'dd/MM/yyyy')}</Typography>
         }
         {selectedCorona1?.date_receiving_positive_result&&selectedCorona1?.date__of_recovery &&<Typography>Corona Details</Typography>}
          {selectedCorona1?.date_receiving_positive_result && <Typography >Date of get positive answer: {format(selectedCorona1?.date_receiving_positive_result, 'dd/MM/yyyy')}</Typography>}
          {selectedCorona1?.date__of_recovery && <Typography>Date of recovery {format(selectedCorona1?.date__of_recovery, 'dd/MM/yyyy')}</Typography>}
          {selectedCorona1?.Date_vaccination.map((v, index) =>v&&(
      
            <div key={index}>
          {selectedCorona1?.Date_vaccination[index]?.date_of_recived&&
              <Typography>
                Date of the Vaccination {index + 1}:{format(selectedCorona1?.Date_vaccination[index]?.date_of_recived, 'dd/MM/yyyy')}
              </Typography>
         }
         {selectedCorona1?.Date_vaccination[index]?.manufacturer&&
              <Typography>
                manufacturer of the Vaccination {index + 1}:{(selectedCorona1?.Date_vaccination[index]?.manufacturer)}
              </Typography>
}
            </div>)
      )}

        </DialogContent>
      )}
     <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>

  );
};

export default PatientDetails





