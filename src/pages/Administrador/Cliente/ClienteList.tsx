// src/components/ClienteList.tsx

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../app/axiosInstance'; // Assuming axiosInstance.ts is in the src folder
import { type Cliente } from '../../../types/type-cliente'; // Define the type for the Cliente data

const ClienteList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]); // State to store the clients data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const response = await api.get('/usuarios/clientes'); // Request to the /clientes endpoint
        setClientes(response.data); // Set the fetched clients to state
      } catch (err) {
        console.error('Error fetching clientes:', err);
        setError('Error fetching clients. Please try again later.');
        toast.error('Error fetching clients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes(); // Call the function to fetch data
  }, []); // Empty dependency array to fetch only on component mount

  // Render loading, error, or clients data
  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Clientes List</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Sexo</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.username}</td>
              <td>{cliente.email}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido_paterno}</td>
              <td>{cliente.apellido_materno}</td>
              <td>{cliente.sexo}</td>
              <td>{cliente.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;
