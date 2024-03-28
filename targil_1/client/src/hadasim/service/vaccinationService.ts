import axios from '../Axios/axios' 
import { Vaccination } from '../types/type'

export const getVaccination = async ()=>
{
    try{
        const response =await axios.get('/vaccinations')
        const vaccinations = response.data;
        return vaccinations;
    }
    catch (error: any) {
        console.log(error)
      }
}
export const getVaccinationById = async (id:string)=>
{
    try{
        const response =await axios.get(`/vaccinations/${id}`)
        const vaccination = response.data;
        return vaccination;
    }
    catch (error: any) {
        console.log(error)
      }
}


export const addVaccination = async (vaccination: Vaccination) => {
    const response = await axios.post('/vaccinations', vaccination)
    const newvaccination = response.data
    return newvaccination
}

export const updatedVaccination = async (vaccination:Vaccination) => {
    try {
      const response = await axios.put(`/vaccinations/`, vaccination)
      const updatedVaccination = response.data
      return updatedVaccination
    }
    catch (error) {
        console.log("error updateing import axios from '../Axiose/axios'") 
    }
}

export const deleteVaccination = async (id: number) => {
    const response = await axios.delete(`/vaccinations/${id}`)
    return response
  }