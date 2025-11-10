import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../../app/axiosInstance';

interface TipoGarantiaFormState {
    tipo: string;
    duracion: number;
    descripcion: string;
    imagen?: FileList;
}

const TipoGarantiaForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [topError, setTopError] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TipoGarantiaFormState>({
        defaultValues: { tipo: '', duracion: 12, descripcion: '' },
    });

    useEffect(() => {
        if (!isEdit || !id) return;
        const loadTipoGarantia = async () => {
            setLoading(true);
            try {
                const { data } = await axiosInstance.get(`/tipos-garantia/${id}/detalle/`);
                reset({
                    tipo: data.tipo,
                    duracion: data.duracion,
                    descripcion: data.descripcion,
                });
                if (data.imagen) {
                    setImagePreview(data.imagen);
                }
            } catch (err) {
                setTopError('Error al cargar los datos del tipo de garantía.');
            } finally {
                setLoading(false);
            }
        };
        loadTipoGarantia();
    }, [id, isEdit, reset]);

    const onSubmit = async (values: TipoGarantiaFormState) => {
        const formData = new FormData();
        formData.append('tipo', values.tipo);
        formData.append('duracion', values.duracion.toString());
        formData.append('descripcion', values.descripcion);
        if (values.imagen && values.imagen[0]) {
            formData.append('imagen', values.imagen[0]);
        }

        try {
            if (isEdit && id) {
                await axiosInstance.put(`/tipo-garantias/${id}/editar/`, formData);
            } else {
                await axiosInstance.post('/tipo-garantias/crear/', formData);
            }
            navigate('/tipos-garantia');
        } catch (error) {
            setTopError('Hubo un error al guardar la garantía.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Editar Tipo de Garantía' : 'Nuevo Tipo de Garantía'}</h2>

            {topError && <div className="mb-4 text-red-600">{topError}</div>}
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full border-t-4 border-blue-600 h-12 w-12"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Garantía</label>
                        <input
                            id="tipo"
                            type="text"
                            {...register('tipo', { required: 'Este campo es obligatorio.' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.tipo && <p className="text-sm text-red-600">{errors.tipo.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="duracion" className="block text-sm font-medium text-gray-700">Duración (meses)</label>
                        <input
                            id="duracion"
                            type="number"
                            {...register('duracion', { valueAsNumber: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            id="descripcion"
                            rows={4}
                            {...register('descripcion')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Imagen</label>
                        <input
                            id="imagen"
                            type="file"
                            {...register('imagen')}
                            className="mt-1 block w-full"
                            onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files![0]))}
                        />
                        {imagePreview && <img src={imagePreview} alt="Imagen vista previa" className="mt-2 w-32 h-32 object-cover" />}
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">{isEdit ? 'Actualizar' : 'Crear'}</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TipoGarantiaForm;
