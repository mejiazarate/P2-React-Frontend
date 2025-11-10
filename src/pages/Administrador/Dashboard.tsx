// src/pages/Admin/Dashboard.tsx
import React from 'react';
import VoiceRecognition from '../../voice/VoiceRecognition'; // Importar el componente
import VentasHistoricas from '../Administrador/Venta/VentasHistoricas'; // Importar el componente
const Dashboard: React.FC = () => (
  <div>
    <h1>Admin Dashboard</h1>
    {/* … */}
     <VoiceRecognition /> 
     <VentasHistoricas/>
  </div>
  
);

export default Dashboard;
