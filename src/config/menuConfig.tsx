// src/config/menuItems.ts
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faUsers,
  faCogs,
  faUserShield,
  faSignOutAlt,
  faUser,
  faGear,
  faShoppingCart,
  faBox,
  faStore,
  faReceipt,
  faFileAlt,
  faMicrophone,
  faDashboard,
  faHistory,
  faBell,
  faFileInvoice,
  faMoneyBillWave,
  faKey,
  faShieldAlt,
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
    
    {
      title: 'Seguridad',
      icon: faShieldAlt,
      subItems: [
        { to: '/administrador/usuarios', title: 'Gestionar Usuarios', icon: faUsers },
        { to: '/administrador/grupos', title: 'Gestionar Grupos', icon: faCogs },
        { to: '/administrador/roles', title: 'Gestionar Roles', icon: faUserShield },
        { to: '/administrador/bitacoras', title: 'Consultar Bitácoras', icon: faHistory },
        { to: '/administrador/notificaciones', title: 'Gestionar Notificaciones', icon: faBell },
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
        { to: '/administrador/garantias', title: 'Garantias', icon: faBox },
        { to: '/administrador/historial-clientes', title: 'Historial de Compras', icon: faHistory },
        { to: '/administrador/ventas', title: 'Ventas', icon: faShoppingCart },
        { to: '/administrador/comprobantes', title: 'Comprobantes', icon: faFileInvoice },
        { to: '/administrador/historial-ventas', title: 'Historial de Ventas', icon: faReceipt },
        { to: '/administrador/predicciones', title: 'Predicciones', icon: faDashboard },

      ],
    },

    {
      title: 'Generación de Reportes',
      icon: faFileAlt,
      subItems: [
        { to: '/administrador/reporte-ventas', title: 'Reportes', icon: faFileAlt },
        { to: '/administrador/reporte-dinamicos', title: 'Reportes Dinamicos', icon: faFileAlt },
        { to: '/administrador/reportes/voz', title: 'Reporte por Voz', icon: faMicrophone },
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
        { to: '/cliente/historial-compras', title: 'Historial de Compras', icon: faHistory },
        { to: '/cliente/comprobantes', title: 'Mis Comprobantes', icon: faReceipt },
      ],
    },

    // Reportes del Cliente
    {
      title: 'Mis Reportes',
      icon: faFileAlt,
      subItems: [
        { to: '/cliente/reportes/compras',  title: 'Reporte de Compras', icon: faFileAlt },
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




};