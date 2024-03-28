import { Navigate, createBrowserRouter } from "react-router-dom";

import Layout from '../layouts/MainLayout';
import { PATHS } from "../api/path";
import Patients from "../pages/Patients/getAll";
///import SignIn from "../pages/Patients/sign-in";
import { OnUpdate1 } from "../pages/Patients/UpdatePtient";
import { getPatientById, getPatients } from "../service/patientService";
import CoronaSummary from "../pages/graph/showGraph";
import SignInTry from "../pages/Patients/sign-in-image";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import Login from "../pages/Users/login";
import SignInUser from "../pages/Users/signIn";
import VaccinationForm from "../pages/coronaDetails/addCoronaDetails";
export const router = createBrowserRouter([
  {

    path: PATHS.home,
    element: <Layout />,
    children:
      [
        {
          path:PATHS.signInUser,
          index: true,
          element: <SignInUser />

        },
        {
          path: PATHS.login,
          element: <GuestGuard><Login /></GuestGuard>
        },
      ]
  },
  {
    path: PATHS.patient,
    element: <AuthGuard><Layout /></AuthGuard>,
    children: [
      {
        path: '',
        index: true,
        element: <Patients />
      },
      {
        path: PATHS.signIn,
        element: <SignInTry />
      },
      {
        path: PATHS.graph,
        element: <CoronaSummary />
      },
      {
        path: PATHS.addCoronaDetails,
        element: <VaccinationForm />
      }


    ]
  },

  {
    path: '/',
    element: <Navigate to={PATHS.home} />
  },
  {
    path: '*',
    element: <h1>404-Not Found</h1>
  }
]);


