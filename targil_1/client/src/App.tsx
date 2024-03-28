import { Provider } from 'react-redux'

import App2 from './try'

import { RouterProvider } from 'react-router-dom';

import Patients from './hadasim/pages/Patients/getAll';
import { store } from './hadasim/redux/store/store';
///import SignIn from './hadasim/pages/Patients/sign-in';
import { router } from './hadasim/router/Router';
import SimpleDialogDemo from './hadasim/pages/Patients/patientDetails';
// import CoronaSummary from './hadasim/pages/graph/showGraph';
import { getPatients } from './hadasim/service/patientService';
import Graph1 from './hadasim/pages/graph/coronaGraph';
import CoronaSummary from './hadasim/pages/graph/showGraph';
import InitializeAuth from './hadasim/auth/InitiliazeAuth';
import VaccinationForm from './hadasim/pages/coronaDetails/addCoronaDetails';
function App() {
// const vaccination1=getPatients()
  return (
    <>
        
        <Provider store={store}>
        <InitializeAuth>
          <RouterProvider router={router}></RouterProvider>
          </InitializeAuth>

        </Provider> 
        {/* <VaccinationForm id={"214822728"}/> */}
    </>
  );
};


export default App;