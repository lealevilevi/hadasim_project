import { ReactNode } from "react"
import { useAppSelector } from "../redux/store/store"
import { selectAuth } from "../redux/selectors/authSelector"
import { Navigate, useLocation } from "react-router-dom"
import { PATHS } from "../api/path"
import { useSelector } from "react-redux"

type Props = {
    children: ReactNode
}

export default function GuestGuard({ children }: Props) {
    const { isAuthanticated, isInitialized } = useSelector(selectAuth)
    const { state } = useLocation()
    if (isAuthanticated) {
        return <Navigate to={state || PATHS.patient} />
    }
    if (!isInitialized) {
        return <h1>Loading...</h1>
    }
    return <>{children}</>
}
