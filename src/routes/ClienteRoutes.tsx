// src/routes/AdminRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.tsx';
import Dashboard from '../pages/Cliente/Dashboard';
import ProductList from '../pages/Cliente/Producto/ProductList.tsx';
import Cart from '../pages/Cliente/Carrito/Cart.tsx';
import Historial from '../pages/Cliente/Historial/Historial.tsx'
import CartExitoso from '../pages/Cliente/Carrito/CartExitoso.tsx';
import CartCancelado from '../pages/Cliente/Carrito/CartCancelado.tsx';
import Comprobante from '../pages/Cliente/Comprobante/Comprobante.tsx';

import Perfil from '../pages/Perfil.tsx';

import ChangePassword from '../pages/CambiarContras.tsx';
// Nuevas importaciones para Grupos



const InquilinoRoutes: React.FC = () => (
    <ProtectedRoute requiredRoles={["Cliente"]}>
        <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            {/* RUTA DEL DASHBOARD */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path='/cambiar-contra' element={<ChangePassword />} />
            <Route path='/productos' element={<ProductList />} />
            <Route path='/carrito' element={<Cart />} />
            <Route path='/historial-compras' element={<Historial />} />
            <Route path='/comprobantes' element={<Comprobante />} />
            
            <Route path='/perfil' element={<Perfil />} />
            
            <Route path="/carrito-pago-exitoso" element={<CartExitoso />} />
            <Route path="/carrito-pago-cancelado" element={<CartCancelado />} />





            {/* <Route path="*" element={<Navigate to="/not-found" replace />} /> */}
        </Routes>
    </ProtectedRoute>
);

export default InquilinoRoutes;