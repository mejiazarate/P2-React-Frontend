// src/schemas/schemas-producto.ts
import { z } from "zod";

export const productoSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    precio: z.number().min(0, "El precio no puede ser negativo"),
    marca: z.string().nullable().optional(),
    modelo: z.string().nullable().optional(),
    stock: z.number().min(0, "El stock no puede ser negativo"),
    descripcion: z.string().min(1, "La descripción es obligatoria"),
    imagen: z.any().optional(), // Cambiado para manejar FileList
});

export type ProductoFormState = z.infer<typeof productoSchema>;