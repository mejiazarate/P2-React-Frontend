import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../../api/user';
import type { CustomUserResponse } from '../../../types/user';
import { toUiError } from '../../../api/error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUser, faEye,faKey } from '@fortawesome/free-solid-svg-icons';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<CustomUserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [confirmingDelete, setConfirmingDelete] = useState<number | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        const uiError = toUiError(err);
        setError(uiError.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) return;

    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      const uiError = toUiError(err);
      setError(uiError.message);
    } finally {
      setConfirmingDelete(null);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Cargando usuarios...</div>;
  if (error) return <div className="p-6 text-red-500 bg-red-50 border border-red-200 rounded-lg">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
          <Link
            to="/administrador/usuarios/new"
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors duration-200 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faUser} />
            Crear Usuario
          </Link>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <p className="mt-4 text-gray-500">No hay usuarios registrados aún.</p>
          </div>
        )}

        {/* Users Table */}
        {users.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">
                      {user.nombre} {user.apellido_paterno}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-500">{user.username}</td>
                    <td className="py-3 px-6 text-sm text-gray-500">{user.rol_nombre ?? 'Sin Rol'}</td>
                    <td className="py-3 px-6 text-sm text-gray-500">{user.email}</td>
                    <td className="py-3 px-6 text-sm text-gray-500">
                      <div className="flex gap-2">
                        <Link
                          to={`/administrador/usuarios/${user.id}/editar`}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex items-center gap-2"
                          aria-label="Editar usuario"
                        >
                          <FontAwesomeIcon icon={faEdit} size="sm" />
                          <span className="text-xs">Editar</span>
                        </Link>
                        <Link
                          to={`/administrador/usuarios/${user.id}/perfil`}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex items-center gap-2"
                          aria-label="Ver perfil"
                        >
                          <FontAwesomeIcon icon={faEye} size="sm" />
                          <span className="text-xs">Ver Perfil</span>
                        </Link>
                          {/* Aquí está el nuevo botón para cambiar la contraseña */}
                        <Link
                          to={`/administrador/usuarios/${user.id}/cambiar-contrasena`}  // Ruta para cambiar la contraseña
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex items-center gap-2"
                          aria-label="Cambiar contraseña"
                        >
                          <FontAwesomeIcon icon={faKey} size="sm" />
                          <span className="text-xs">Cambiar Contraseña</span>
                        </Link>

                        <button
                          onClick={() => setConfirmingDelete(user.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors flex items-center gap-2"
                          aria-label="Eliminar usuario"
                        >
                          <FontAwesomeIcon icon={faTrash} size="sm" />
                          <span className="text-xs">Eliminar</span>
                        </button>
                        
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Confirmación de eliminación */}
        {confirmingDelete !== null && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
            <p className="text-red-800 mb-2">¿Eliminar este usuario?</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(confirmingDelete)}
                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setConfirmingDelete(null)}
                className="px-3 py-1 bg-gray-200 text-gray-800 text-xs rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
