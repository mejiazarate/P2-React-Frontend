// src/types/type-producto.ts
export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    marca: string | null;
    modelo: string | null;
    stock: number;
    descripcion: string;
     imagen: string | null;

}
