import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartButton: React.FC = () => {
  const [cartVisible, setCartVisible] = useState(false); // Estado para controlar la visibilidad del carrito
  const [cartItems, setCartItems] = useState<any[]>([]); // Aquí se guardarán los productos del carrito
  const navigate = useNavigate(); // Instancia de navigate para redirigir a otra página

  useEffect(() => {
    // Cargar los productos del carrito desde el almacenamiento local o la API
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  // Función para mostrar/ocultar el carrito
  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button onClick={toggleCart} className="flex items-center space-x-2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700">
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {cartItems.length > 0 && <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">{cartItems.length}</span>}
      </button>

      {cartVisible && (
        <div className="cart-dropdown bg-white shadow-lg rounded-lg mt-2 p-4">
          <button onClick={() => navigate('/cliente/carrito')} className="text-blue-600 hover:underline">
            Ir al carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default CartButton;