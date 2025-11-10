import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../../app/axiosInstance';

const ReporteVentas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formato, setFormato] = useState('excel');

  const obtenerReporteVentas = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/reportes/estaticos/reporte_ventas/', {
        params: { formato },
        responseType: formato === 'html' ? 'text' : 'blob',
      });

      // Si el formato es HTML, abrirlo en una nueva ventana
      if (formato === 'html') {
        const newWindow = window.open();

        if (newWindow) {
          newWindow.document.write(response.data);
          newWindow.document.close();
        } else {
          toast.error('No se pudo abrir una nueva ventana. Verifica que los pop-ups no estén bloqueados.');
        }
      } else {
        // Si es PDF o Excel, descargamos el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        
        // Determinar la extensión del archivo según el formato
        const extension = formato === 'pdf' ? 'pdf' : 'xlsx';
        link.setAttribute('download', `Reporte_Ventas.${extension}`);
        
        document.body.appendChild(link);
        link.click();
        
        // Limpiar
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast.success(`Reporte ${formato.toUpperCase()} descargado exitosamente`);
      }
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      toast.error('Ocurrió un error al generar el reporte. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reporte-ventas">
      <h1>Reporte de Ventas</h1>
      <div>
        <label>Seleccionar Formato: </label>
        <select value={formato} onChange={(e) => setFormato(e.target.value)}>
          <option value="excel">Excel</option>
          <option value="pdf">PDF</option>
          <option value="html">HTML</option>
        </select>
      </div>
      <button onClick={obtenerReporteVentas} disabled={isLoading}>
        {isLoading ? 'Generando reporte...' : 'Generar Reporte de Ventas'}
      </button>
    </div>
  );
};

export default ReporteVentas;
