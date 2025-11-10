// src/components/VentasHistoricas.js

import  { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosInstance from '../../../app/axiosInstance'; // Asegúrate de que esta ruta sea correcta

const VentasHistoricas = () => {
    const [ventasData, setVentasData] = useState([]);

    useEffect(() => {
        // Realizar la solicitud GET para obtener los datos de ventas históricas
        axiosInstance.get('/ventas-historicas/')
            .then(response => {
                // Suponiendo que los datos que devuelve la API estén en response.data
                setVentasData(response.data);
            })
            .catch(error => {
                console.error('Error fetching ventas:', error);
            });
    }, []);

    return (
        <div>
            <h3>Ventas Históricas</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={ventasData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_ventas" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VentasHistoricas;
