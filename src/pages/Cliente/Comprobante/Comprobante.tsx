import  { useEffect, useState } from 'react'
import axios from '../../../app/axiosInstance'  // Asegúrate de que la ruta del archivo api.ts sea correcta
import { toast } from 'react-toastify'

type Comprobante = {
  id: number
  usuario_nombre: string
  monto: string
  fecha_pago: string
  metodo_pago: string
  referencia: string
  comprobante: string | null
  observaciones: string | null
  venta: number | null
}

const Comprobantes = () => {
  const [comprobantes, setComprobantes] = useState<Comprobante[]>([])
  const [error, setError] = useState<string>('')

  // Realiza la solicitud a la API para obtener los comprobantes
  useEffect(() => {
    axios.get('/pagos/mis_comprobantes/')
      .then(response => {
        setComprobantes(response.data)  // Almacenar los datos de los comprobantes
      })
      .catch(error => {
        setError('No se pudieron cargar los comprobantes.')  // Manejo de errores
        console.error(error)  // Imprime los detalles del error en la consola
        toast.error('Hubo un error al cargar los comprobantes')  // Muestra el error al usuario
      })
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Comprobantes de Pago</h1>

      {/* Mostrar un mensaje de error si ocurre */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Si no hay comprobantes, mostramos un mensaje indicándolo */}
      {comprobantes.length === 0 ? (
        <p>No tienes comprobantes disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {/* Iteramos sobre los comprobantes */}
          {comprobantes.map((comprobante) => (
            <li key={comprobante.id} className="border p-4 rounded-md shadow-md">
              <h3 className="text-xl font-semibold">Comprobante de Pago #{comprobante.id}</h3>
              <p><strong>Nombre:</strong> {comprobante.usuario_nombre}</p>
              <p><strong>Monto:</strong> ${comprobante.monto}</p>
              <p><strong>Fecha de Pago:</strong> {comprobante.fecha_pago}</p>
              <p><strong>Método de Pago:</strong> {comprobante.metodo_pago}</p>
              <p><strong>Referencia:</strong> {comprobante.referencia}</p>
              {comprobante.comprobante ? (
                <a 
                  href={comprobante.comprobante} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-700"
                  download={`comprobante_venta_${comprobante.id}.pdf`}  // Esto forzará la descarga
                >
                  Descargar Comprobante
                </a>
              ) : (
                <p>No disponible</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Comprobantes
