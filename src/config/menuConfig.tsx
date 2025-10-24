// src/config/menuItems.ts
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faUsers,
  faCogs,
  faBoxOpen,
  faUserShield,
  faSignOutAlt,
  faUser,
  faGear,
  faShoppingCart,
  faBox,
  faStore,
  faReceipt,
  faChartLine,
  faFileAlt,
  faFilePdf,
  faFileExcel,
  faMicrophone,
  faRobot,
  faBrain,
  faChartBar,
  faDashboard,
  faTags,
  faWarehouse,
  faHistory,
  faCreditCard,
  faBell,
  faFileInvoice,
  faFilter,
  faCalendar,
  faDownload,
  faClock,
  faSearch,
  faMoneyBillWave,
  faTrophy,
  faChartPie,
  faDatabase,
  faCloudUploadAlt,
  faKey,
  faShieldAlt,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

export interface MenuItem {
  to?: string;
  title: string;
  icon?: IconProp;
  action?: 'signout';
  subItems?: MenuItem[];
}

export const menuItemsByRole: Record<string, MenuItem[]> = {
  Administrador: [
    { 
      to: '/administrador/dashboard', 
      title: 'DASHBOARD', 
      icon: faHome 
    },
    
    // PAQUETE 1: SEGURIDAD Y AUTENTICACIÓN
    {
      title: 'Seguridad y Autenticación',
      icon: faShieldAlt,
      subItems: [
        { to: '/administrador/perfil', title: 'Mi Perfil', icon: faUser },
        { to: '/administrador/cambiar-contra', title: 'Cambiar Contraseña', icon: faKey },
        { to: '/administrador/usuarios', title: 'Gestionar Usuarios', icon: faUsers },
        { to: '/administrador/grupos', title: 'Gestionar Grupos', icon: faCogs },
        { to: '/administrador/roles', title: 'Gestionar Roles', icon: faUserShield },
        { to: '/administrador/bitacoras', title: 'Consultar Bitácoras', icon: faHistory },
        { title: 'Cerrar Sesión', icon: faSignOutAlt, action: 'signout' },
      ],
    },

    // PAQUETE 2: GESTIÓN COMERCIAL
    {
      title: 'Gestión Comercial',
      icon: faStore,
      subItems: [
        // Sub-paquete: Gestión de Productos
        { to: '/administrador/productos', title: 'Productos', icon: faBox },
        { to: '/administrador/categorias', title: 'Categorías', icon: faTags },
        { to: '/administrador/inventario', title: 'Control de Stock', icon: faWarehouse },
        { to: '/administrador/buscar-producto', title: 'Buscar Productos', icon: faSearch },
        
        // Sub-paquete: Gestión de Clientes
        { to: '/administrador/clientes', title: 'Clientes', icon: faUsers },
        { to: '/administrador/historial-clientes', title: 'Historial de Compras', icon: faHistory },
        
        // Sub-paquete: Gestión de Ventas
        { to: '/administrador/ventas', title: 'Ventas', icon: faShoppingCart },
        { to: '/administrador/comprobantes', title: 'Comprobantes', icon: faFileInvoice },
        { to: '/administrador/metodos-pago', title: 'Métodos de Pago', icon: faCreditCard },
        { to: '/administrador/historial-ventas', title: 'Historial de Ventas', icon: faReceipt },
      ],
    },

    // PAQUETE 3: GENERACIÓN DE REPORTES DINÁMICOS
    {
      title: 'Generación de Reportes',
      icon: faFileAlt,
      subItems: [
        { to: '/administrador/reportes/texto', title: 'Reporte por Texto', icon: faFileAlt },
        { to: '/administrador/reportes/voz', title: 'Reporte por Voz', icon: faMicrophone },
        { to: '/administrador/reportes/pdf', title: 'Reportes en PDF', icon: faFilePdf },
        { to: '/administrador/reportes/excel', title: 'Reportes en Excel', icon: faFileExcel },
        { to: '/administrador/reportes/historial', title: 'Historial de Reportes', icon: faClock },
        { to: '/administrador/reportes/programados', title: 'Reportes Programados', icon: faCalendar },
        { to: '/administrador/reportes/descargas', title: 'Descargas', icon: faDownload },
      ],
    },

    // PAQUETE 4: PREDICCIÓN DE VENTAS (IA/ML)
    {
      title: 'Predicción de Ventas (IA)',
      icon: faBrain,
      subItems: [
        { to: '/administrador/predicciones/dashboard', title: 'Dashboard de Predicciones', icon: faDashboard },
        { to: '/administrador/predicciones/entrenar', title: 'Entrenar Modelo', icon: faRobot },
        { to: '/administrador/predicciones/historico', title: 'Ventas Históricas', icon: faChartLine },
        { to: '/administrador/predicciones/comparacion', title: 'Predicciones vs Reales', icon: faChartBar },
        { to: '/administrador/predicciones/configuracion', title: 'Configurar Modelo', icon: faCog },
        { to: '/administrador/predicciones/metricas', title: 'Métricas del Modelo', icon: faChartPie },
        { to: '/administrador/predicciones/exportar', title: 'Exportar Predicciones', icon: faDownload },
      ],
    },

    // PAQUETE 5: DASHBOARD Y VISUALIZACIONES
    {
      title: 'Dashboard y Analytics',
      icon: faChartBar,
      subItems: [
        { to: '/administrador/analytics/principal', title: 'Dashboard Principal', icon: faHome },
        { to: '/administrador/analytics/ventas', title: 'Gráficos de Ventas', icon: faChartLine },
        { to: '/administrador/analytics/kpis', title: 'KPIs en Tiempo Real', icon: faTrophy },
        { to: '/administrador/analytics/productos', title: 'Top Productos', icon: faBox },
        { to: '/administrador/analytics/clientes', title: 'Top Clientes', icon: faUsers },
        { to: '/administrador/analytics/personalizar', title: 'Personalizar Dashboard', icon: faGear },
      ],
    },

    // PAQUETE 7: ADMINISTRACIÓN DEL SISTEMA
    {
      title: 'Administración del Sistema',
      icon: faCogs,
      subItems: [
        { to: '/administrador/sistema/configuracion', title: 'Configuración Global', icon: faGear },
        { to: '/administrador/sistema/backup', title: 'Backup de BD', icon: faDatabase },
        { to: '/administrador/sistema/logs', title: 'Logs del Sistema', icon: faHistory },
        { to: '/administrador/sistema/monitoreo', title: 'Monitorear Rendimiento', icon: faChartBar },
        { to: '/administrador/sistema/notificaciones', title: 'Configurar Notificaciones', icon: faBell },
      ],
    },
  ],

  Cliente: [
    { 
      to: '/cliente/dashboard', 
      title: 'DASHBOARD', 
      icon: faHome 
    },

    // Mi Perfil
    {
      title: 'Mi Perfil',
      icon: faUser,
      subItems: [
        { to: '/cliente/perfil', title: 'Datos Personales', icon: faUser },
        { to: '/cliente/cambiar-contra', title: 'Cambiar Contraseña', icon: faKey },
        { title: 'Cerrar Sesión', icon: faSignOutAlt, action: 'signout' },
      ],
    },

    // Compras
    {
      title: 'Mis Compras',
      icon: faShoppingCart,
      subItems: [
        { to: '/cliente/productos', title: 'Ver Productos', icon: faBox },
        { to: '/cliente/carrito', title: 'Mi Carrito', icon: faShoppingCart },
        { to: '/cliente/historial-compras', title: 'Historial de Compras', icon: faHistory },
        { to: '/cliente/comprobantes', title: 'Mis Comprobantes', icon: faReceipt },
      ],
    },

    // Reportes del Cliente
    {
      title: 'Mis Reportes',
      icon: faFileAlt,
      subItems: [
        { to: '/cliente/reportes/compras', title: 'Reporte de Compras', icon: faFileAlt },
        { to: '/cliente/reportes/gastos', title: 'Resumen de Gastos', icon: faMoneyBillWave },
      ],
    },

    // Notificaciones
    {
      title: 'Notificaciones',
      icon: faBell,
      subItems: [
        { to: '/cliente/notificaciones', title: 'Ver Notificaciones', icon: faBell },
        { to: '/cliente/notificaciones/config', title: 'Configurar Alertas', icon: faGear },
      ],
    },
  ],

  Vendedor: [
    { 
      to: '/vendedor/dashboard', 
      title: 'DASHBOARD', 
      icon: faHome 
    },

    // Mi Perfil
    {
      title: 'Mi Perfil',
      icon: faUser,
      subItems: [
        { to: '/vendedor/perfil', title: 'Datos Personales', icon: faUser },
        { to: '/vendedor/cambiar-contra', title: 'Cambiar Contraseña', icon: faKey },
        { title: 'Cerrar Sesión', icon: faSignOutAlt, action: 'signout' },
      ],
    },

    // Gestión de Ventas
    {
      title: 'Gestión de Ventas',
      icon: faShoppingCart,
      subItems: [
        { to: '/vendedor/nueva-venta', title: 'Nueva Venta', icon: faShoppingCart },
        { to: '/vendedor/ventas', title: 'Mis Ventas', icon: faReceipt },
        { to: '/vendedor/productos', title: 'Consultar Productos', icon: faBox },
        { to: '/vendedor/clientes', title: 'Consultar Clientes', icon: faUsers },
      ],
    },

    // Reportes del Vendedor
    {
      title: 'Mis Reportes',
      icon: faFileAlt,
      subItems: [
        { to: '/vendedor/reportes/ventas', title: 'Reporte de Ventas', icon: faChartLine },
        { to: '/vendedor/reportes/comisiones', title: 'Mis Comisiones', icon: faMoneyBillWave },
      ],
    },
  ],

  Gerente: [
    { 
      to: '/gerente/dashboard', 
      title: 'DASHBOARD', 
      icon: faHome 
    },

    // Mi Perfil
    {
      title: 'Mi Perfil',
      icon: faUser,
      subItems: [
        { to: '/gerente/perfil', title: 'Datos Personales', icon: faUser },
        { to: '/gerente/cambiar-contra', title: 'Cambiar Contraseña', icon: faKey },
        { title: 'Cerrar Sesión', icon: faSignOutAlt, action: 'signout' },
      ],
    },

    // Analytics Gerenciales
    {
      title: 'Analytics y KPIs',
      icon: faChartBar,
      subItems: [
        { to: '/gerente/analytics/general', title: 'Dashboard General', icon: faDashboard },
        { to: '/gerente/analytics/ventas', title: 'Análisis de Ventas', icon: faChartLine },
        { to: '/gerente/analytics/productos', title: 'Análisis de Productos', icon: faBox },
        { to: '/gerente/analytics/clientes', title: 'Análisis de Clientes', icon: faUsers },
        { to: '/gerente/analytics/rentabilidad', title: 'Rentabilidad', icon: faMoneyBillWave },
      ],
    },

    // Predicciones
    {
      title: 'Predicciones',
      icon: faBrain,
      subItems: [
        { to: '/gerente/predicciones/dashboard', title: 'Dashboard Predicciones', icon: faChartLine },
        { to: '/gerente/predicciones/tendencias', title: 'Tendencias de Mercado', icon: faChartBar },
      ],
    },

    // Reportes Gerenciales
    {
      title: 'Reportes Gerenciales',
      icon: faFileAlt,
      subItems: [
        { to: '/gerente/reportes/ejecutivo', title: 'Reporte Ejecutivo', icon: faFilePdf },
        { to: '/gerente/reportes/comparativo', title: 'Análisis Comparativo', icon: faChartPie },
        { to: '/gerente/reportes/voz', title: 'Reporte por Voz', icon: faMicrophone },
      ],
    },

    // Gestión de Equipo
    {
      title: 'Gestión de Equipo',
      icon: faUsers,
      subItems: [
        { to: '/gerente/equipo/vendedores', title: 'Ver Vendedores', icon: faUsers },
        { to: '/gerente/equipo/rendimiento', title: 'Rendimiento del Equipo', icon: faTrophy },
      ],
    },
  ],
};