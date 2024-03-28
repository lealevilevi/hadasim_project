
import { Patient } from '../../types/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type PatientStateType = {
  patients: Patient[]
}

const initialState: PatientStateType = {
  patients: []
}
const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatients: (state: PatientStateType, action: PayloadAction<Patient[]>) => {
          state.patients = action.payload; // Update the patient array with the payload data
    },
    addPatient: (state: PatientStateType, action: PayloadAction<Patient>) => {
          state.patients.push(action.payload)
    },
    deletePatient: (state: PatientStateType, action: PayloadAction<string>) => {
        state.patients = state.patients.filter(p => p.id !== action.payload)
        return state
    },
 
    updatePatient: (state: PatientStateType, action: PayloadAction<Patient>) => {
      for (let i = 0; i < state.patients.length; i++) {
        if (state.patients[i].id == action.payload.id) {
          state.patients[i] = action.payload
        }
      }
      return state
    },
  }
})



// Export actions and reducer
export const { addPatient, deletePatient, updatePatient,setPatients } = patientSlice.actions;
export default patientSlice.reducer;