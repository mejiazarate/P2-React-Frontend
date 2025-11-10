// src/routes/AdminRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import RolesList from '../pages/Administrador/Rol/RolList';
import RolesForm from '../pages/Administrador/Rol/RolForm';
import Dashboard from '../pages/Administrador/Dashboard';
import BitacoraList from '../pages/Administrador/Bitacora/BitacoraList';
import BitacoraDetail from '../pages/Administrador/DetalleBitacora/DetalleBitacoraList';
import GrupoList from '../pages/Administrador/Grupo/GrupoList';
import GrupoForm from '../pages/Administrador/Grupo/GrupoForm';

import UserList from '../pages/Administrador/Usuarios/UserList';
import UserForms from '../pages/Administrador/Usuarios/UserForms';
import UserDetail from '../pages/Administrador/Usuarios/UserDetail';

import ProductoForm from '../pages/Administrador/Producto/ProductoForm.tsx';
import ProductoList from '../pages/Administrador/Producto/ProductoList.tsx';

import TipoGarantiaForm from '../pages/Administrador/TipoGarantia/TipoGarantiaForm.tsx';
import TipoGarantiaList from '../pages/Administrador/TipoGarantia/TipoGarantiaList.tsx';

//reportes
import ReporteVentas from '../pages/Administrador/Repote/ReporteVentas.tsx';
import ReporteDinamico from '../pages/Administrador/Repote/ReporteDinamico.tsx';

import VentasHistoricas from '../pages/Administrador/Venta/VentasHistoricas.tsx';


import EnviarCorreo from '../pages/Administrador/Correo/EnviarCorreo.tsx';

import ClienteList from '../pages/Administrador/Cliente/ClienteList.tsx';


import PredictVenta from '../pages/Administrador/Prediccion/PredictVenta.tsx';
import NotificationSender from '../pages/Administrador/Notificacion/NotificationSender.tsx';

import ChangePasswordByUser from '../pages/Administrador/Usuarios/ChangePasswordByUser'; // <--- NEW IMPORT
import PerfilUsuario from '../pages/Administrador/Usuarios/Perfil.tsx'; // <--- NEW IMPORT


import ChangePassword from '../pages/CambiarContras';
import HistorialDeCompras from '../pages/Administrador/Historial/Historial.tsx';
const AdminRoutes: React.FC = () => (
    <ProtectedRoute requiredRoles={["Administrador"]}>
        <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            {/* RUTA DEL DASHmeBOARD */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/enviar-correo" element={<EnviarCorreo />} />

            <Route path="/reporte-ventas" element={<ReporteVentas />} />
            <Route path="/reporte-dinamicos" element={<ReporteDinamico />} />
            <Route path="/ventas-historicas" element={<VentasHistoricas />} />
            
            <Route path="/predicciones" element={<PredictVenta />} />
            <Route path="/notificaciones" element={<NotificationSender />} />



            




            <Route path="roles" element={<RolesList />} />
            <Route path="roles/new" element={<RolesForm />} />
            <Route path="roles/:id/edit" element={<RolesForm />} />
            {/* RUTA DEL usuarios */}

            {/* RUTA DEL DASHBOARD */}
            <Route path="bitacoras" element={<BitacoraList />} />
            <Route path="bitacoras/:id" element={<BitacoraDetail />} />
            {/* RUTAS PARA GRUPOS */}
            <Route path="grupos" element={<GrupoList />} />
            <Route path="grupos/new" element={<GrupoForm />} />
            <Route path="grupos/:id/edit" element={<GrupoForm />} />
            {/* RUTAS PARA Telefonos */}

            {/* Rutas para el CRUD de Administrador */}
            {/* Rutas para el CRUD de Administrador */}
            <Route path="usuarios" element={<UserList />} />
            <Route path="usuarios/:id" element={<UserDetail />} />
            <Route path="usuarios/new" element={<UserForms />} />
            <Route path="usuarios/:id/editar" element={<UserForms />} />
            <Route path="usuarios/:id/cambiar-contrasena" element={<ChangePasswordByUser />} /> {/* <--- NEW ROUTE */}

            <Route path="productos" element={<ProductoList />} />
            <Route path="productos/new" element={<ProductoForm />} />
            <Route path="productos/:id/editar" element={<ProductoForm />} />

            
            <Route path="garantias" element={<TipoGarantiaList />} />
            <Route path="garantias/new" element={<TipoGarantiaForm />} />
            <Route path="garantias/:id/editar" element={<TipoGarantiaForm />} />

            <Route path="clientes" element={<ClienteList />} />
            <Route path="/historial-clientes" element={<HistorialDeCompras />} />

            <Route path='/cambiar-contra' element={<ChangePassword />} />
            <Route path='usuarios/:id/perfil' element={<PerfilUsuario />} />

        </Routes>
    </ProtectedRoute>
);

export default AdminRoutes;