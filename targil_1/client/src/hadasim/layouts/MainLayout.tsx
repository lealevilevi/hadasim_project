import { Outlet } from "react-router-dom";
import NavBar from "../sections/navBar";
import { useDispatch, useSelector } from "react-redux";
import { selectPatient } from "../redux/selectors/patientSelector";
import { useEffect } from "react";
import { setPatients } from "../redux/slices/patientSlice";
import { getPatients as getPatientsApi } from "../service/patientService";

export default function Layout() {
    const patient=useSelector(selectPatient)
    const dispatch=useDispatch()
    return <>
        <header><NavBar/></header>
        <main><Outlet /></main>
        <footer></footer>
    </>

}

