import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductos, deleteProducto } from '../../../api/api-producto';
import { type Producto } from '../../../types/type-producto';
import { toUiError } from '../../../api/error';
//import { FaMicrophoneAlt } from 'react-icons/fa'; 
import VoiceRecognition from '../../../voice/VoiceRecognition'
const ProductoList: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [topError, setTopError] = useState<string>('');

  useEffect(() => {
    const loadProductos = async () => {
      setLoading(true);
      try {
        const productosData = await fetchProductos();
        setProductos(productosData);
      } catch (err) {
        const uiError = toUiError(err);
        setTopError(uiError.message);
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProducto(id);
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      const uiError = toUiError(err);
      setTopError(uiError.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botón de reconocimiento de voz */}
     <VoiceRecognition /> 
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Lista de Productos</h1>
       
        {topError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {topError}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-500">Cargando productos...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productos.map(producto => (
              <div key={producto.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={producto.imagen || '/path/to/default/image.jpg'} alt={producto.nombre} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">{producto.nombre}</h3>
                  <p className="text-gray-600">{producto.descripcion}</p>
                  <p className="text-lg font-bold text-gray-900">${producto.precio}</p>
                </div>
                <div className="flex justify-between p-4 border-t border-gray-200">
                  <Link to={`/administrador/productos/${producto.id}/editar`} className="text-blue-600 hover:text-blue-800">
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(producto.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <Link to="/administrador/productos/new" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            Crear Producto
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductoList;
