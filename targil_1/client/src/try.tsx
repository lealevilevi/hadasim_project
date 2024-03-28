
import React, { useState, useEffect } from 'react';

function App() {
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/vehicles/electric?apiKey=xDWEuSsEQkveAm4IO4h2uJyNuB9g4dBG');
        
        if (response.ok) {
          const data = await response.json();
          setVehicles(data.vehicles); // Adjust data path if needed
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>List of Electric Vehicles</h1>
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index}>
            <strong>Name:</strong> {vehicle.name}, <strong>Manufacturer:</strong> {vehicle.manufacturer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;