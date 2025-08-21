# 🎯 Cómo Usar Badges Dinámicos con Pinia Store

## ❌ **Problema Original**
```typescript
// ❌ ESTO NO FUNCIONA - Composables solo se pueden usar en setup()
{
  tipe: 'link',
  text: 'Por Recibir',
  route: '/office/documentos_porrecibir',
  badge_count: useSidebarStore().datos_stat_documentos.porrecibir // ❌ Error!
}
```

## ✅ **Solución Correcta**

### **1. Estructura del Array Base (sin badges)**
```typescript
// En lista_menulateral.ts
const baseMenuItems: MenuItem[] = [
  {
    tipe: 'link',
    text: 'Por Recibir',
    icon: 'ph-duotone ph-duotone ph-hand',
    route: '/office/documentos_porrecibir',
    role_ids: [1,2,3]
    // ✅ No badge_count aquí
  }
];
```

### **2. Composable que Agrega Badges Dinámicamente**
```typescript
// En lista_menulateral.ts
export const useMenuItems = () => {
  const sidebarStore = useSidebarStore();
  
  const menuItems = computed(() => {
    return baseMenuItems.map(item => {
      const newItem = { ...item };
      
      // ✅ Agregar badges según la ruta
      switch (item.route) {
        case '/office/documentos_porrecibir':
          newItem.badge_count = sidebarStore.datos_stat_documentos.porrecibir;
          newItem.badge_color = 'primary';
          break;
        // ... más casos
      }
      
      return newItem;
    });
  });
  
  return { menuItems };
};
```

### **3. Usar en el Componente**
```typescript
// En panel_sidebar.vue
export default defineComponent({
  setup() {
    const sidebarStore = useSidebarStore();
    const { menuItems: menuItemsWithBadges } = useMenuItems();
    
    const filteredMenuItems = computed(() => {
      // Filtrar por roles usando el menú con badges
      return filterByRole(menuItemsWithBadges.value);
    });
    
    onMounted(() => {
      // ✅ Inicializar el sistema de badges
      // sidebarStore.iniciarActualizacionAutomatica();
    });
    
    return { filteredMenuItems };
  }
});
```

## 🚀 **Cómo Funciona**

1. **Array Base**: Define el menú sin badges
2. **Composable**: Calcula badges dinámicamente usando el store
3. **Componente**: Usa el composable y filtra por roles
4. **Store**: Carga datos del API automáticamente cada 2 minutos

## 📊 **Mapeo de Rutas a Badges**

```typescript
const routeToBadgeMap = {
  '/office/documentos_porrecibir': 'porrecibir',      // Muestra datos_stat_documentos.porrecibir
  '/office/documentos_recibidos': 'recibidos',        // Muestra datos_stat_documentos.recibidos
  '/office/documentos_enviados': 'enviados',          // Muestra datos_stat_documentos.enviados
  '/office/mesapartes_archivados': 'archivado'        // Muestra datos_stat_documentos.archivado
};
```

## ⚡ **Actualización desde Otros Componentes**

```typescript
// Desde cualquier componente
import { useSidebarStore } from '@/stores/sidebarStore';

export default {
  setup() {
    const sidebarStore = useSidebarStore();
    
    const actualizarDespuesDeAccion = async () => {
      // ✅ Forzar actualización inmediata
      await sidebarStore.forzarRecarga();
      console.log('¡Badges actualizados!');
    };
    
    return { actualizarDespuesDeAccion };
  }
}
```

## 🔧 **Comandos Útiles del Store**

```typescript
const sidebarStore = useSidebarStore();

// Iniciar sistema automático (ya se hace en sidebar)
sidebarStore.iniciarActualizacionAutomatica();

// Forzar actualización inmediata
await sidebarStore.forzarRecarga();

// Detener sistema automático
sidebarStore.detenerActualizacionAutomatica();

// Reiniciar completamente
sidebarStore.reiniciarSistema();
```

---

## ✅ **Resultado Final**

- ✅ **Badges dinámicos** que se actualizan automáticamente
- ✅ **Datos reales** del API cada 2 minutos
- ✅ **Reactividad** en todos los componentes
- ✅ **Performance optimizado** con un solo intervalo global
- ✅ **Fácil actualización** desde cualquier componente

¡Tu sistema de badges ahora es completamente reactivo y eficiente! 🎉
