import axios from '../app/axiosInstance';
import { useState, useRef, useCallback } from 'react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const debounceTimerRef = useRef<number | null>(null);
  const lastSentTextRef = useRef<string>('');

  // Inicializar reconocimiento solo una vez
  if (!recognitionRef.current) {
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'es-ES';
    recognitionRef.current.interimResults = true;
    recognitionRef.current.maxAlternatives = 1;
    recognitionRef.current.continuous = false; // Se detiene automáticamente después de detectar silencio
  }

  const sendToDialogflow = useCallback(async (text: string) => {
    // Evitar enviar el mismo texto dos veces
    if (text === lastSentTextRef.current || !text.trim() || isSending) {
      return;
    }

    try {
      setIsSending(true);
      lastSentTextRef.current = text;
      
      const res = await axios.post('/dialogflow/', { text });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error en la comunicación con Dialogflow:', error);
      setResponse('Lo siento, no pude procesar tu solicitud.');
    } finally {
      setIsSending(false);
    }
  }, [isSending]);

  const startListening = () => {
    const recognition = recognitionRef.current;
    
    // Limpiar estado previo
    setTranscript('');
    setResponse('');
    lastSentTextRef.current = '';
    
    // Configurar evento onresult con debounce
    recognition.onresult = (event: any) => {
      const current = event.results[event.results.length - 1];
      const currentTranscript = current[0].transcript;
      
      setTranscript(currentTranscript);

      // Limpiar temporizador anterior
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Si es el resultado final, enviar inmediatamente
      if (current.isFinal) {
        sendToDialogflow(currentTranscript);
      } else {
        // Si no es final, esperar 1.5 segundos de silencio antes de enviar
        debounceTimerRef.current = setTimeout(() => {
          sendToDialogflow(currentTranscript);
        }, 1500);
      }
    };

    recognition.onend = () => {
      setListening(false);
      // Si hay texto y no se ha enviado, enviarlo ahora
      if (transcript && transcript !== lastSentTextRef.current) {
        sendToDialogflow(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Error de reconocimiento: ", event.error);
      setListening(false);
      
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setResponse(`Error: ${event.error}`);
      }
    };

    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    recognitionRef.current.stop();
    setListening(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex gap-4 mb-6">
        <button 
          onClick={startListening} 
          disabled={listening || isSending} 
          className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            listening || isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {listening ? '🎤 Escuchando...' : 'Iniciar Reconocimiento'}
        </button>
        
        <button 
          onClick={stopListening} 
          disabled={!listening} 
          className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
            !listening ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Detener
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-600 mb-2">Texto transcrito:</p>
        <p className="text-lg text-gray-800 font-semibold">
          {transcript || "Esperando..."}
        </p>
      </div>

      {isSending && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-blue-600">⏳ Procesando solicitud...</p>
        </div>
      )}

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Respuesta de Dialogflow:</p>
        <p className="text-lg text-gray-800 font-semibold">
          {response || "Esperando respuesta..."}
        </p>
      </div>
    </div>
  );
};

export default VoiceRecognition;