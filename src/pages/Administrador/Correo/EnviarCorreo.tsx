// src/components/EnviarCorreo.tsx
import { useState, type FormEvent } from 'react';
import api from '../../../app/axiosInstance'; // Asegúrate de que esta ruta sea correcta
import { toast } from 'react-toastify';

const EnviarCorreo = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Aquí se define el tipo del evento como FormEvent<HTMLFormElement>
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica que los campos no estén vacíos
    if (!subject || !message) {
      toast.error('El asunto y el mensaje son obligatorios');
      return;
    }

    try {
      // Enviar la solicitud POST a tu endpoint Django
      const response = await api.post('/send-email/', {
        subject,
        message,
      });

      // Mostrar éxito si el correo se envió correctamente
      if (response.status === 200) {
        toast.success('Correo enviado correctamente');
        setSubject('');
        setMessage('');
      }
    } catch (error) {
      // Mostrar error si algo salió mal
      toast.error('Error al enviar el correo');
    }
  };

  return (
    <div>
      <h3>Enviar Correo Electrónico</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Asunto</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Escribe el asunto"
          />
        </div>
        <div>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe el mensaje"
          ></textarea>
        </div>
        <button type="submit">Enviar Correo</button>
      </form>
    </div>
  );
};

export default EnviarCorreo;
