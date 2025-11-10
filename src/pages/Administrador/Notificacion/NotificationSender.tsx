// src/components/NotificationSender.tsx
// src/services/notificationService.ts
import axiosInstance from '../../../app/axiosInstance'; // Asegúrate de que esta ruta sea correcta


/**
 * Función para enviar una notificación a través del backend usando FCM.
 * @param usuarioId El ID del usuario al que se enviará la notificación.
 * @param titulo El título de la notificación.
 * @param cuerpo El cuerpo de la notificación.
 * @param datosAdicionales Datos adicionales que se enviarán con la notificación.
 */
export const enviarNotificacion = async (dispositivoId: number, titulo: string, cuerpo: string, datosAdicionales: object = {}) => {
  try {
    // Hacer la solicitud POST al endpoint de la API con dispositivo_id en lugar de usuario_id
    const response = await axiosInstance.post('/notificaciones/enviar-notificacion/', {
      dispositivo_id: dispositivoId,  // Usamos dispositivo_id en lugar de usuario_id
      titulo: titulo,
      cuerpo: cuerpo,
      datos_adicionales: datosAdicionales
    });

    // Mostrar un mensaje de éxito
    toast.success('Notificación enviada exitosamente.');

    // Si es necesario, puedes devolver la respuesta para un manejo posterior
    return response.data;
  } catch (error) {
    // Manejo de error si la notificación no se puede enviar
    toast.error('Error al enviar la notificación.');
    console.error('Error enviando notificación:', error);
    throw error; // Re-throw para manejo en el componente si es necesario
  }
};

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NotificationSender = () => {
  const [dispositivoId, setDispositivoId] = useState<number>(1); // ID del dispositivo
  const [titulo, setTitulo] = useState<string>('');
  const [cuerpo, setCuerpo] = useState<string>('');
  const [datosAdicionales, setDatosAdicionales] = useState<object>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificamos si el título y cuerpo están vacíos
    if (!titulo || !cuerpo) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    try {
      // Llamamos a la función para enviar la notificación
      await enviarNotificacion(dispositivoId, titulo, cuerpo, datosAdicionales);
    } catch (error) {
      console.error('Error al enviar la notificación', error);
    }
  };

  return (
    <div>
      <h2>Enviar Notificación</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dispositivoId">ID del Dispositivo:</label>
          <input
            type="number"
            id="dispositivoId"
            value={dispositivoId}
            onChange={(e) => setDispositivoId(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cuerpo">Cuerpo:</label>
          <textarea
            id="cuerpo"
            value={cuerpo}
            onChange={(e) => setCuerpo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="datosAdicionales">Datos Adicionales (opcional):</label>
          <textarea
            id="datosAdicionales"
            value={JSON.stringify(datosAdicionales)}
            onChange={(e) => setDatosAdicionales(JSON.parse(e.target.value))}
          />
        </div>
        <button type="submit">Enviar Notificación</button>
      </form>
    </div>
  );
};

export default NotificationSender;
