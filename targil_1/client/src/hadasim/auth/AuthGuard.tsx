import { ReactNode } from "react"
import { useAppSelector } from "../redux/store/store"
import { selectAuth } from "../redux/selectors/authSelector"
import { Navigate, useLocation } from "react-router-dom"
import { PATHS } from "../api/path"

type Props = {
    children: ReactNode
}

export default function AuthGuard({ children }: Props) {
    const { isAuthanticated, isInitialized } = useAppSelector(selectAuth)
    const { pathname } = useLocation()

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }
    if (!isAuthanticated) {
        return <Navigate to={PATHS.login} state={pathname} />
    }
    return <>{children}</>
}