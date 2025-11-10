// src/api/api-producto.ts
import axios from '../app/axiosInstance';
import { type Producto } from '../types/type-producto';

export const fetchProductos = async (): Promise<Producto[]> => {
    const { data } = await axios.get<Producto[]>('/productos/');
    return data;
};

export const fetchProducto = async (id: number): Promise<Producto> => {
    const { data } = await axios.get<Producto>(`/productos/${id}/`);
    return data;
};

export const createProducto = async (dto: Producto): Promise<Producto> => {
    const { data } = await axios.post<Producto>('/productos/', dto);
    return data;
};

export const updateProducto = async (id: number, dto: Producto): Promise<Producto> => {
    const { data } = await axios.put<Producto>(`/productos/${id}/`, dto);
    return data;
};

export const deleteProducto = async (id: number): Promise<void> => {
    await axios.delete(`/productos/${id}/`);
};
