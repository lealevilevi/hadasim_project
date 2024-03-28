import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Vaccination } from '../../types/type';
import { BarChart } from '@mui/x-charts/BarChart';
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { current } from '@reduxjs/toolkit';
import { number } from 'yup';

interface CoronaGraphProps {
  activePatientsData: number[];
  unvaccinatedPatientsCount: number;
  numOfPatients: number;
}
Chart.register(CategoryScale);
const CoronaGraph: React.FC<CoronaGraphProps> = ({ activePatientsData, unvaccinatedPatientsCount, numOfPatients }) => {
  const data1 = {
    labels: Array.from({ length: activePatientsData.length }, (_, i) => i + 1), // ימי החודש
    datasets: [
      {
        label: 'Active Patients',
        data: activePatientsData,
        fill: true,
        backgroundColor: 'red',
        borderColor: 'red',
      }
    ],
  };
  const data2 =
  {
    labels: ['number of patients who are not vaccinated','number of vaccinated patients'],
    datasets: [
      {
        label:'num of vaccinated/not patients',
        data: [unvaccinatedPatientsCount, numOfPatients - unvaccinatedPatientsCount], // מספר החולים שאינם מחוסנים
        fill: true,
        backgroundColor: 'red',
        borderColor: 'red',
      },
    ],
  }

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={data1}
        options={{
          scales: {
            y: {
              suggestedMax: Math.max(...activePatientsData) + 5, // תוסיפי 10 לערך המקסימלי של ציר ה-Y
            }
          },
          plugins: {
            title: {
              display: true,
              text: "Active Patients Per Day in this month"
            },

            legend: {
              display: true
            }
          }
        }}
      />
      <Bar
        data={data2}
        options={{
          plugins: {
            title: {
              display: true,
              text: "A picture of the situation of the vaccinated in the health fund"
            }
          }
        }}
      />
    </div>

  );

};

export default CoronaGraph;






