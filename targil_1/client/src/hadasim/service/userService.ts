import axios from "../Axios/axios"
import { User } from "../types/type"

export const addUser = async (user:User) => {
    const response = await axios.post('/user', user)
    const newUser = response.data
    return newUser
}
export const getUserById = async (id:string)=>
{
    try{
        const response =await axios.get(`/user/${id}`)
        const user= response.data;
        return user;
    }
    catch (error: any) {
        console.log(error)
      }
}