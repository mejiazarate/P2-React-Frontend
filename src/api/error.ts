import type { AxiosError } from 'axios'

type UiError = {
  message: string      // texto para mostrar al usuario
  fields?: Record<string, string[]> // errores por campo (validación)
  status?: number      // código HTTP si existe
}

export function toUiError(err: unknown): UiError {
  const ax = err as AxiosError<any>

  // Si el error tiene respuesta (es decir, se recibió una respuesta del servidor)
  if (ax?.response) {
    const { status, data } = ax.response
    
    // Revisamos si la respuesta contiene un error específico y lo mostramos
    if (data?.error) {
      return {
        message: data.error.message || 'Ocurrió un error inesperado',  // Mensaje dinámico
        fields: data.error.fields,  // Si hay campos con errores de validación, los mostramos también
        status
      }
    }
    
    // Si la respuesta contiene un detalle (en caso de error en el servidor)
    if (data?.detail) {
      return { 
        message: data.detail || 'Ocurrió un error al procesar la solicitud',
        status
      }
    }
    
    // Si no tiene un mensaje específico, pero tiene otros detalles
    return { 
      message: 'Error de validación, por favor revise los campos.', 
      fields: data, 
      status 
    }
  }

  // Si no hay respuesta del servidor pero sí una solicitud, significa que no hay conexión
  if (ax?.request) return { message: 'No hay conexión con el servidor' }
  
  // En cualquier otro caso, devolvemos un mensaje de error genérico
  return { message: (ax as any)?.message || 'Error desconocido' }
} 
