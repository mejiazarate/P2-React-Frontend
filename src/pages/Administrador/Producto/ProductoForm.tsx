import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoSchema, type ProductoFormState } from '../../../schemas/schema-producto';
import axiosInstance from '../../../app/axiosInstance';
import { toUiError } from '../../../api/error';

const ProductoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = useMemo(() => Boolean(id), [id]);
  const navigate = useNavigate();

  const [loading, setLoading] =    useState(false);
  const [topError, setTopError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProductoFormState>({
    resolver: zodResolver(productoSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { 
      nombre: '', 
      precio: 0, 
      marca: '', 
      modelo: '', 
      stock: 0, 
      descripcion: '' 
    },
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (!isEdit || !id) return;
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/productos/${id}/`);
        console.log('Datos del producto:', data);
      
        reset({
          nombre: data.nombre,
          precio: parseFloat(data.precio) || 0,
          marca: data.marca ?? '',
          modelo: data.modelo ?? '',
          stock: data.stock,
          descripcion: data.descripcion,
        });

        // Guardar la imagen actual si existe
        if (data.imagen) {
          setImagePreview(data.imagen);
        }
      } catch (err) {
        setTopError('No se pudo cargar los datos del producto.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, isEdit, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('imagen', {
          type: 'manual',
          message: 'La imagen no puede ser mayor de 10MB',
        });
        return;
      }

      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setError('imagen', {
          type: 'manual',
          message: 'El archivo debe ser una imagen',
        });
        return;
      }

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: ProductoFormState) => {
    setTopError('');
    
    try {
      // Crear FormData para enviar archivos
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('precio', values.precio.toString());
      formData.append('marca', values.marca || '');
      formData.append('modelo', values.modelo || '');
      formData.append('stock', values.stock.toString());
      formData.append('descripcion', values.descripcion);

      // Agregar imagen si se seleccionó una nueva
      const imageInput = document.getElementById('imagen') as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append('imagen', imageInput.files[0]);
      }

      if (isEdit && id) {
        await axiosInstance.put(`/productos/${id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axiosInstance.post('/productos/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      navigate('/administrador/productos');
    } catch (error) {
      const uiError = toUiError(error);
      if (uiError.message) setTopError(uiError.message);
      if (uiError.fields) {
        Object.keys(uiError.fields).forEach((field) => {
          const message = uiError.fields?.[field];
          setError(field as keyof ProductoFormState, {
            type: 'server',
            message: Array.isArray(message) ? message.join(' ') : String(message),
          });
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={() => navigate('/administrador/productos')}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Volver a la lista de productos"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {topError && (
          <div className="mb-4 p-3 rounded-md bg-red-100 border border-red-200 text-red-700 text-sm">
            {topError}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[150px]">
            <p className="text-gray-600">Cargando datos…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Campo de imagen */}
            <div>
              <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">
                Imagen del producto
              </label>
              
              {imagePreview && (
                <div className="mb-4 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      const input = document.getElementById('imagen') as HTMLInputElement;
                      if (input) input.value = '';
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="imagen"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FontAwesomeIcon icon={faImage} className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB)</p>
                  </div>
                  <input
                    id="imagen"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              
              {errors.imagen && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.imagen.message as string}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del producto
              </label>
              <input
                id="nombre"
                type="text"
                {...register('nombre')}
                placeholder="Ej. Producto X"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.nombre && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
                Precio
              </label>
              <input
                id="precio"
                type="number"
                step="0.01"
                {...register('precio', { valueAsNumber: true })}
                placeholder="Ej. 100.00"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.precio ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.precio && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.precio.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1">
                  Marca (opcional)
                </label>
                <input
                  id="marca"
                  type="text"
                  {...register('marca')}
                  placeholder="Ej. Sony"
                  className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.marca ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.marca && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.marca.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo (opcional)
                </label>
                <input
                  id="modelo"
                  type="text"
                  {...register('modelo')}
                  placeholder="Ej. XM4"
                  className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    errors.modelo ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.modelo && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.modelo.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                {...register('stock', { valueAsNumber: true })}
                placeholder="Ej. 50"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.stock ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.stock && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="descripcion"
                rows={4}
                {...register('descripcion')}
                placeholder="Descripción del producto"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.descripcion ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.descripcion && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.descripcion.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/administrador/productos')}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-md transition-colors duration-200 ${
                  isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                )}
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductoForm;