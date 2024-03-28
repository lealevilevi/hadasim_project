import axios from '../Axios/axios' 
import { Patient } from '../types/type'

export const getPatients = async ()=>
{
    try{
        const response =await axios.get('/patient')
        const patients = response.data;
        return patients;
    }
    catch (error: any) {
        console.log(error)
      }
}
export const getPatientById = async (id:string): Promise<Blob> =>
{
        const response =await axios.get(`/patient/:image/${id}`,{responseType: 'blob'})
        const patient = response.data;
        debugger
        return patient;
}
export const getPatientById2 = async (id:string) =>
{
        const response =await axios.get(`/patient/${id}`)
        const patient = response.data;
        debugger
        return patient;
}


export const addPatient = async (patient:FormData) => {
    const response = await axios.post('/patient', patient)
    const newpatient = response.data
    return newpatient
}

export const updatePatient = async (patient:Patient) => {
    try {
      const response = await axios.put(`/patient/`, patient)
      const updated= response.data
      return updated
    }
    catch (error) {
        console.log(error) 
    }
}

export const deletePatient = async (id: string) => {
    const response = await axios.delete(`/patient/${id}`)
    return response
  }
