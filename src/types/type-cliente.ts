// src/types.ts

export interface Cliente {
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  sexo: string;
  direccion: string;
  fecha_nacimiento: string | null; // Assuming the date could be null
  rol: number; // ID of the rol
  rol_nombre: string; // Name of the role
}
