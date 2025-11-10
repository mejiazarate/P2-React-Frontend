// src/pages/Perfil.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../../api/user'; // Asegúrate de tener esta función de API
import { type CustomUserResponse } from '../../../types/user';

const PerfilUsuario: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID del usuario desde la URL
  const [userProfile, setUserProfile] = useState<CustomUserResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchUserProfile(Number(id)); // Llamar al API para obtener el perfil
        setUserProfile(profileData);
      } catch (err) {
        setError('No se pudo cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-500">Cargando perfil...</div>;
  if (error) return <div className="p-6 text-red-500 bg-red-50 border border-red-200 rounded-lg">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Perfil de {userProfile?.nombre}</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
          <div className="space-y-4">
            <div>
              <span className="font-medium text-gray-800">Nombre: </span>{userProfile?.nombre} {userProfile?.apellido_paterno}
            </div>
            <div>
              <span className="font-medium text-gray-800">Username: </span>{userProfile?.username}
            </div>
            <div>
              <span className="font-medium text-gray-800">Email: </span>{userProfile?.email}
            </div>
            <div>
              <span className="font-medium text-gray-800">Rol: </span>{userProfile?.rol_nombre ?? 'Sin rol asignado'}
            </div>
            <div>
              <span className="font-medium text-gray-800">Dirección: </span>{userProfile?.direccion ?? 'No disponible'}
            </div>
            <div>
              <span className="font-medium text-gray-800">Fecha de nacimiento: </span>{userProfile?.fecha_nacimiento ?? 'No disponible'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
