import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../../../app/axiosInstance'
import qs from 'qs'

const TODOS_LOS_CAMPOS_POR_TABLA: Record<string, { value: string; label: string }[]> = {
  venta: [
    { value: 'cliente', label: 'Cliente' },
    { value: 'producto', label: 'Producto' },
    { value: 'cantidad', label: 'Cantidad' },
    { value: 'precio_total', label: 'Precio total' },
    { value: 'fecha', label: 'Fecha' },
  ],
  producto: [
    { value: 'nombre', label: 'Nombre' },
    { value: 'marca', label: 'Marca' },
    { value: 'precio', label: 'Precio' },
    { value: 'stock', label: 'Stock' },
  ],
}

export default function ReporteDinamico() {
  const [isLoading, setIsLoading] = useState(false)
  const [formato, setFormato] = useState<'excel' | 'pdf' | 'html'>('excel')
  const [tabla, setTabla] = useState<'venta' | 'producto'>('venta')
  const [campos, setCampos] = useState<string[]>([])

  const toggleCampo = (value: string) => {
    setCampos((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const obtenerReporteDinamico = async () => {
    if (!campos.length) {
      toast.info('Selecciona al menos un campo.')
      return
    }
    setIsLoading(true)
    try {
      const resp = await axios.get('/reportes/dinamicos/generar_reporte/', {
        params: { tabla, campos, formato },
        paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'repeat' }),
        responseType: formato === 'html' ? 'text' : 'blob',
      })

      if (formato === 'html') {
        const win = window.open()
        if (win) {
          win.document.write(resp.data)
          win.document.close()
        } else {
          toast.error('No se pudo abrir la ventana (pop-ups bloqueados).')
        }
      } else {
        const url = window.URL.createObjectURL(new Blob([resp.data]))
        const a = document.createElement('a')
        a.href = url
        a.download = `Reporte_${tabla}.${formato === 'pdf' ? 'pdf' : 'xlsx'}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        toast.success(`Reporte ${formato.toUpperCase()} descargado`)
      }
    } catch (e) {
      console.error(e)
      toast.error('Error al generar el reporte')
    } finally {
      setIsLoading(false)
    }
  }

  const opciones = TODOS_LOS_CAMPOS_POR_TABLA[tabla] ?? []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-center">Generar Reporte Dinámico</h1>

        <div className="bg-white shadow rounded-xl p-6 space-y-6">
          {/* Tabla */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tabla</label>
            <select
              value={tabla}
              onChange={(e) => {
                setTabla(e.target.value as any)
                setCampos([]) // limpiar selección al cambiar tabla
              }}
              className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-blue-500"
            >
              <option value="venta">Venta</option>
              <option value="producto">Producto</option>
            </select>
          </div>

          {/* Campos (checkboxes) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Campos</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {opciones.map((c) => (
                <label
                  key={c.value}
                  className="flex items-center gap-2 rounded-lg border p-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={campos.includes(c.value)}
                    onChange={() => toggleCampo(c.value)}
                  />
                  <span className="text-sm text-gray-800">{c.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Seleccionados: {campos.length ? campos.join(', ') : 'ninguno'}
            </p>
          </div>

          {/* Formato */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Formato</label>
            <select
              value={formato}
              onChange={(e) => setFormato(e.target.value as any)}
              className="w-full rounded-lg border p-2.5 focus:ring-2 focus:ring-blue-500"
            >
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
              <option value="html">HTML</option>
            </select>
          </div>

          {/* Botón */}
          <button
            onClick={obtenerReporteDinamico}
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          >
            {isLoading ? 'Generando…' : 'Generar reporte'}
          </button>
        </div>
      </div>
    </div>
  )
}
