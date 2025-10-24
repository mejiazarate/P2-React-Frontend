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



import ChangePasswordByUser from '../pages/Administrador/Usuarios/ChangePasswordByUser'; // <--- NEW IMPORT



import ChangePassword from '../pages/CambiarContras';
import Perfil from '../pages/Perfil.tsx';
const AdminRoutes: React.FC = () => (
    <ProtectedRoute requiredRoles={["Administrador"]}>
        <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            {/* RUTA DEL DASHBOARD */}
            <Route path="dashboard" element={<Dashboard />} />

 
   

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


           
         
            <Route path='/cambiar-contra' element={<ChangePassword />} />
            <Route path='/perfil' element={<Perfil />} />

        </Routes>
    </ProtectedRoute>
);

export default AdminRoutes;