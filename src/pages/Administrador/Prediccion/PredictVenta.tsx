import React, { useState } from 'react'
import axios from '../../../app/axiosInstance'; // Asegúrate de que esta ruta sea correcta

const PredictVenta = () => {
  const [cantidad, setCantidad] = useState(0)
  const [precioUnitario, setPrecioUnitario] = useState(0)
  const [promocion, setPromocion] = useState(0)
  const [metodoPago, setMetodoPago] = useState('tarjeta')
  const [diaSemana, setDiaSemana] = useState(0)
  const [mesAno, setMesAno] = useState(1)
  const [esFeriado, setEsFeriado] = useState(0)
  const [prediccion, setPrediccion] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Manejar el envío del formulario
  const hacerPrediccion = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear el objeto con los datos del formulario
    const data = {
      cantidad,
      precio_unitario: precioUnitario,
      promocion,
      metodo_pago: metodoPago,
      dia_de_la_semana: diaSemana,
      mes_del_ano: mesAno,
      es_feriado: esFeriado,
    };

    try {
      // Hacer la solicitud POST al endpoint de predicción
      const response = await axios.post('/model/', {
        action: 'predict', // Acción para hacer la predicción
        ...data,
      });

      // Obtener el precio total predicho desde la respuesta
      setPrediccion(response.data.precio_total_predicho);
      setError(null); // Limpiar cualquier error previo
    } catch (err) {
      // Manejar errores
      setPrediccion(null);
      setError('Error al hacer la predicción. Intenta de nuevo.');
    }
  };


  // Función para entrenar el modelo
  const entrenarModelo = async () => {
    try {
      // Realizar una solicitud para entrenar el modelo
      await axios.post('/model/', {
        action: 'train', // Acción para entrenar el modelo
      });
      alert('Modelo entrenado exitosamente.');
    } catch (err) {
      alert('Error al entrenar el modelo. Intenta de nuevo.');
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4 text-center">Predicción de Precio Total de Venta</h2>
      <form onSubmit={hacerPrediccion} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Precio Unitario:</label>
          <input
            type="number"
            value={precioUnitario}
            onChange={(e) => setPrecioUnitario(Number(e.target.value))}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Promoción:</label>
          <select
            value={promocion}
            onChange={(e) => setPromocion(Number(e.target.value))}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="0">No</option>
            <option value="1">Sí</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Método de Pago:</label>
          <input
            type="text"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Día de la Semana (0-6):</label>
          <input
            type="number"
            value={diaSemana}
            onChange={(e) => setDiaSemana(Number(e.target.value))}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mes del Año (1-12):</label>
          <input
            type="number"
            value={mesAno}
            onChange={(e) => setMesAno(Number(e.target.value))}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">¿Es un día feriado?</label>
          <select
            value={esFeriado}
            onChange={(e) => setEsFeriado(Number(e.target.value))}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="0">No</option>
            <option value="1">Sí</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Hacer Predicción
          </button>
          <button
            type="button"
            onClick={entrenarModelo}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
          >
            Entrenar Modelo
          </button>
        </div>
      </form>

      {/* Mostrar la predicción o el error */}
      {prediccion !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-xl font-medium">Precio Total Predicho: {prediccion}</h3>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
          <h3>{error}</h3>
        </div>
      )}
    </div>
  )
}

export default PredictVenta
