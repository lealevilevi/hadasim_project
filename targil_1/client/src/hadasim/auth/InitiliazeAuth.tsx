import { ReactNode, useEffect } from "react"
import { AuthUser } from "../types/type"
import { getSession, isValidToken } from "./auth.utils"
import { setInitialize, setUser } from "../redux/slices/authSlice"
import axios from "../Axios/axios"
import { useDispatch } from "react-redux"
type Props = {
    children: ReactNode
}

export default function InitializeAuth({ children }: Props) {
    const dispatch = useDispatch();

    useEffect(() => {
        const authUser: AuthUser|null = getSession()
        if (authUser?.token && isValidToken(authUser.token)) {
            axios.defaults.headers.common.Authorization = `${authUser.token}`
            // בדיקה האם הטוקן שווה לנתוני היוזר
            dispatch(setUser(authUser.user))
        }
        dispatch(setInitialize())
    }, [])

    return <>{children}</>
}
