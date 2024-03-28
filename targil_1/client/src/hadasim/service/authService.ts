import axios from "../Axios/axios";
import { PATHS } from "../api/path";
import { User,AuthUser } from "../types/type";

export const login = async (id:string,password:string) => {
    var data={ id,password}
    const response = await axios.post(`/login`,data)
    return response.data
}