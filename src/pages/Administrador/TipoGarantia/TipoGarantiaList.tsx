import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../app/axiosInstance';

interface TipoGarantia {
  id: number;
  tipo: string;
  duracion: number;
  descripcion: string;
  imagen: string;
}

const TipoGarantiaList: React.FC = () => {
  const [tiposGarantia, setTiposGarantia] = useState<TipoGarantia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [topError, setTopError] = useState<string>('');

  useEffect(() => {
    const loadTiposGarantia = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get('/tipo-garantias/listar/');
        setTiposGarantia(data);
      } catch (err) {
        setTopError('Error al cargar los tipos de garantía.');
      } finally {
        setLoading(false);
      }
    };
    loadTiposGarantia();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/tipo-garantias/${id}/eliminar/`);
      setTiposGarantia(tiposGarantia.filter(t => t.id !== id));
    } catch (err) {
      setTopError('Error al eliminar el tipo de garantía.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Tipos de Garantía</h1>
      
      {topError && <div className="mb-4 text-red-600">{topError}</div>}
      
      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando tipos de garantía...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tiposGarantia.map(tipo => (
            <div key={tipo.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={tipo.imagen || '/path/to/default/image.jpg'} alt={tipo.tipo} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{tipo.tipo}</h3>
                <p className="text-gray-600">{tipo.descripcion}</p>
                <p className="text-lg font-bold text-gray-900">Duración: {tipo.duracion} meses</p>
              </div>
              <div className="flex justify-between p-4 border-t border-gray-200">
                <Link to={`/tipos-garantia/${tipo.id}/editar`} className="text-blue-600 hover:text-blue-800">
                  Editar
                </Link>
                <button onClick={() => handleDelete(tipo.id)} className="text-red-600 hover:text-red-800">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Link to="/tipos-garantia/new" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Crear Tipo de Garantía
        </Link>
      </div>
    </div>
  );
};

export default TipoGarantiaList;
