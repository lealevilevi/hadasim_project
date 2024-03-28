import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Patient, Vaccination } from '../../types/type';
import { useLoaderData } from 'react-router-dom';
import { constants } from 'buffer';
import { getVaccination } from '../../service/vaccinationService';
import moment from 'moment';

import CoronaGraph from './coronaGraph';
import { getPatients as getPatientsApi} from '../../service/patientService';
import { useDispatch, useSelector } from 'react-redux';
import { selectPatient } from '../../redux/selectors/patientSelector';
import { setPatients } from '../../redux/slices/patientSlice';
import { bool } from 'yup';
const CoronaSummary: React.FC = () => {
    const [activePatientsData, setActivePatientsData] = useState<number[]>([]);
    const [num_of_patients, setNum_of_patients] = useState<number>(0)
    const [unvaccinatedPatientsCount, setUnvaccinatedPatientsCount] = useState<number>(0);
    const patientsSelector=useSelector(selectPatient)
    const dispatch=useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("patient selector:\n"+patientsSelector.patients.length)
                debugger
                if(patientsSelector.patients.length==0)
                {
                    const patients = await getPatientsApi();
                    dispatch(setPatients(patients))
                }
                //set num of patients in the hmo
                setNum_of_patients(patientsSelector.patients.length)
                const vaccinations = await getVaccination();
                //get current date
                const currentDate = new Date();
                //get last month
                const lastMonth = currentDate.getMonth();
                const currentDate2 = moment();
                console.log(currentDate.getMonth())
                const daysInMonth = currentDate2.daysInMonth();

                // Calculate active patients per day
                const activePatientsPerDay: number[] = new Array(daysInMonth).fill(0);
                console.log(vaccinations)
                if (vaccinations) {


                    // הוספת מספור ימים למערך עבור תאריכי קבלת תשובה חיובית ותאריכי קבלת תשובה שלילית
                    vaccinations.forEach((vaccination: Vaccination) => {

                        const positiveDate = new Date(vaccination.date_receiving_positive_result);
                        const negativeDate = new Date(vaccination.date__of_recovery);
                        if (positiveDate.getFullYear() == currentDate.getFullYear() && negativeDate.getFullYear() == currentDate.getFullYear()) {
                            // הוספת מספור ימים עבור תאריך קבלת תשובה שלילית ולכל התאריכים הבאים עד לתאריך קבלת תשובה שלילית
                            for (let i = positiveDate.getDate(); i <= negativeDate.getDate(); i++) {
                                activePatientsPerDay[i - 1]++;
                            }
                        }
                    });


                    setActivePatientsData(activePatientsPerDay);
                }
                let flag=true;
                let unvaccinatedCount = 0;
                for (const patient of patientsSelector.patients) {
                    const vaccination = vaccinations.find((v: { Ptientid: any; }) => v.Ptientid === patient.id);
                    vaccination?.Date_vaccination?.forEach((element: any) => {
                        if(element.date_of_recived!=null)
                            flag=false
                    });
                    if (!vaccination || vaccination.Date_vaccination.length === 0||flag) {
                        unvaccinatedCount++;
                    }
                }
                console.log("number of not vaccinatoined : "+unvaccinatedCount)
                setUnvaccinatedPatientsCount(unvaccinatedCount);
            } catch (error:any) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [patientsSelector]);

    return (
        <div>
            <CoronaGraph activePatientsData={activePatientsData} unvaccinatedPatientsCount={unvaccinatedPatientsCount} numOfPatients={num_of_patients} />
        </div>
    );
};

export default CoronaSummary;





