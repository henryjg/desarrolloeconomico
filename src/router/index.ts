
import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import HomeView from '../views/VistaAdministrador.vue'
import { usarAuthStore } from '../stores/autentificacionStore';
import { addStyle, removeStyle } from '../utils/stylesManager';
import { usePaginaStore } from '../stores/paginaStore';
import Operaciones from '../views/VistaOperacionesDigitales.vue'


const routes: Array<RouteRecordRaw> = [
  { 
    path: '/office',
    name: 'office_admin',
    component: HomeView,
    meta: { requiresAuth: true, style: '' },
    children: [
      {
        path: 'archivos',
        component: () => import('../views/administrador/archivos_lista.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'trabajador',
        name: 'ModuloTrabajador',
        component: () => import('../views/administrador/trabajador_lista.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'registrartrabajador',
        name: 'registrarTrabajador',
        component: () => import('../views/administrador/trabajador_registrar.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'configuracion',
        name: 'Configuracion',
        component: () => import('../views/administrador/configurar_pagina.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'editartrabajador/:id',
        name: 'editarTrabajador',
        component: () => import('../views/administrador/trabajador_editar.vue'),
        props: true,
        meta: { requiresAuth: true },
      },


      {
        path: 'requisito',
        component: () => import('../views/administrador/requisito_lista.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'oficina',
        component: () => import('../views/administrador/oficina_lista.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tramite',
        component: () => import('../views/administrador/tramiteTUPA_lista.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tramite/:idtra',
        name: 'Editartramite',
        component: () => import('../views/administrador/tramiteTUPA_editar.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'licencia_buscar',
        name: 'BuscarLicencia',
        component: () => import('../views/administrador/licencia_buscar.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'crearlicencia',
        name: 'CrearLicencia',
        component: () => import('../views/administrador/licencia_crear.vue'),
        meta: { requiresAuth: true },
      },
      
      {
        path: 'editarlicencia/:idlic',
        name: 'Editarlicencia',
        component: () => import('../views/administrador/licencia_editar.vue'),
        props: true,
        meta: { requiresAuth: true },
      },      
      {
        path: 'generarlicencia/:idlic',
        name: 'Generarlicencia',
        component: () => import('../views/administrador/licencia_generarlicencia.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'recibirlicencia/:idlic',
        name: 'Recibirlicencia',
        component: () => import('../views/administrador/licencia_recibir.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'detalle_emision/:idlic',
        name: 'Detalle_Emision',
        component: () => import('../views/administrador/licencia_emitidasdetalle.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'licencia_solicitudes',
        name: 'ListarSolicitudesLicencia',
        component: () => import('../views/administrador/licencia_listasolicitudes.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'licencias_enproceso',
        name: 'Lista_Licencias_enproceso',
        component: () => import('../views/administrador/licencia_enproceso.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'licencias_rechazadas',
        component: () => import('../views/administrador/licencia_rechazadas.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'licencias_emitidas',
        name: 'ListarLicenciasEmitidas',
        component: () => import('../views/administrador/licencia_emitidas.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'licencias_correlacion',
        name: 'ListarLicenciascorrelacion',
        component: () => import('../views/administrador/licencia_reportecorrelacion.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'autorizaciones_emitidas',
        name: 'AutorizacionesEmitidas',
        component: () => import('../views/administrador/autorizaciones_emitidas.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'licencias_debaja',
        component: () => import('../views/administrador/licencia_debaja.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'licencias_vencidas',
        component: () => import('../views/administrador/licencia_vencidas.vue'),
        meta: { requiresAuth: true },
      },
   
      // {
      //   path: 'listadocumento',
      //   component: () => import('../views/administrador/expedientes_lista.vue'),
      //   meta: { requiresAuth: true },
      // },
      // {
      //   path: 'listadocumento',
      //   component: () => import('../views/administrador/expedientes_lista.vue'),
      //   meta: { requiresAuth: true },
      // },
    ]
  },
  
  {
    path: '/',
    name: 'Principal',
    component: () => import('../views/VistaPrincipal.vue'),
    meta: { style: '/licencias/src/assets/css/landing.css' },
    beforeEnter: async (to, from, next) => {
      const paginaStore = usePaginaStore();
      if (!paginaStore.pagina) {
        await paginaStore.almacenaPagina();
      }
      next();
    },
    children: [
      {
        path: '/',
        name: 'Inicio',
        component: () => import('../views/home/casilla_login.vue')
      },
      {
        path: 'licenciadefuncionamiento',
        name: 'LicenciadeFuncionamiento',
        component: () => import('../views/home/nosotros.vue')
      },
      {
        path: 'verified/:idlic',
        name: 'Verified',
        component: () => import('../views/home/verified.vue')
      },
   
    ]
  },
  {
    path: '/extranet',
    name: 'Operaciones',
    component: Operaciones,
    children: [
      {
        path: 'menu',
        name: 'MenuOperaciones',
        component: () => import('../views/operaciones/menu.vue')
      },
      {
        path: 'formulariolicencias',
        name: 'FormularioLicencias',
        component: () => import('../views/operaciones/formulario.vue')
      },
      {
        path: 'solicitudes',
        name: 'Solicitudes',
        component: () => import('../views/operaciones/solicitudes.vue')
      },
      {
        path: 'ingreso_expedientes',
        name: 'IngresoExpedientes',
        component: () => import('../views/operaciones/documento_crear.vue')
      }
    ]
    }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory('/licencias/'), // Define la subcarpeta aquí
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const authStore = usarAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.usuario_Logueado) {
    if (!authStore.token_id) {
      next({ name: 'Inicio' });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  const toParent = to.matched[0]?.meta?.style as string | undefined;
  const fromParent = from.matched[0]?.meta?.style as string | undefined;

  if (fromParent && fromParent !== toParent) {
    removeStyle(fromParent);
  }
  if (toParent && toParent !== fromParent) {
    addStyle(toParent);
  }
});

export default router;
