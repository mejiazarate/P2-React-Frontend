import { useEffect, useState } from 'react';
import api from '../../../app/axiosInstance'; // Asegúrate de que esta ruta sea correcta
import { toast } from 'react-toastify'; // Para notificaciones en caso de error

// 1. Tipo para el Producto anidado (dentro de VentaItem)
type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string; // Viene como string del DecimalField
  imagen: string | null;
  stock: number;
  marca: string;
  modelo: string;
};

// 2. Tipo para el Item de Venta (la estructura anidada en items_vendidos)
type VentaItem = {
  producto: Producto;
  cantidad: number;
  precio_unitario: string; // Viene como string del DecimalField
};

// 3. Tipo principal para la Venta (ajustado para coincidir con el JSON)
type Venta = {
  id: number;
  fecha: string;
  estado_venta: string;
  metodo_pago: string;
  precio_total: string; // Viene como string del DecimalField
  precio_total_formateado: string; // El campo extra que agregaste en el serializer
  items_vendidos: VentaItem[]; // <-- CORRECCIÓN CLAVE: Nombre y Tipo
  // 'cantidad_items' no viene en el JSON, lo calcularemos.
};

const HistorialDeCompras = () => {
  const [compras, setCompras] = useState<Venta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Función para obtener el historial de compras del usuario
    const obtenerHistorial = async () => {
      try {
        const response = await api.get('/ventas/'); // Asegúrate que el slash final no cause problemas
        console.log('RESPUESTA', response.data);
        
        // CORRECCIÓN: Usar la data directamente, no hay necesidad de un mapeo complejo aquí
        setCompras(response.data); 
      } catch (error) {
        // En un entorno de desarrollo, podrías loguear el error para debug.
        // console.error(error); 
        toast.error('Hubo un error al obtener el historial de compras.');
      } finally {
        setLoading(false);
      }
    };

    obtenerHistorial();
  }, []);

  if (loading) return <div className="text-center py-6">Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Historial de Compras</h1>
      <div className="space-y-4">
        {compras.length === 0 ? (
          <div className="text-center">No has realizado compras aún.</div>
        ) : (
          compras.map((compra) => {
            // CALCULAR: Contamos la cantidad total de items vendidos en esta compra
            const cantidadTotalItems = compra.items_vendidos.reduce(
                (total, item) => total + item.cantidad,
                0
            );

            return (
              <div key={compra.id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Compra #{compra.id}</span>
                  <span className="text-sm text-gray-500">{compra.fecha}</span>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-700">
                    <span className="font-bold">Estado: </span>
                    {compra.estado_venta}
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-bold">Método de pago: </span>
                    {compra.metodo_pago}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    {/* USAMOS EL CAMPO FORMATEADO DIRECTAMENTE */}
                    <span>{compra.precio_total_formateado}</span> 
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Cantidad de productos</span>
                    {/* USAMOS EL VALOR CALCULADO */}
                    <span>{cantidadTotalItems}</span> 
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">Productos:</h3>
                  <ul className="space-y-2">
                    {/* CORRECCIÓN: Mapear sobre 'items_vendidos' */}
                    {compra.items_vendidos.length > 0 ? (
                      compra.items_vendidos.map((item, index) => {
                        // El producto está dentro del item
                        const producto = item.producto;
                        const subtotal = item.cantidad * parseFloat(item.precio_unitario);
                        
                        return (
                          <li key={index} className="flex justify-between">
                            <span>{producto.nombre}</span>
                            <span>
                              {item.cantidad} x ${parseFloat(item.precio_unitario).toFixed(2)} = 
                              ${subtotal.toFixed(2)}
                            </span>
                          </li>
                        );
                      })
                    ) : (
                      <li>No se han encontrado productos en esta compra.</li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HistorialDeCompras;