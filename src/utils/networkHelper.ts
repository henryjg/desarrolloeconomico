// utils/networkHelper.ts
import { ref, onMounted, onUnmounted } from 'vue';
import Notif from '../utils/notificaciones'; // Importa las notificaciones

type StatusChangeCallback = (status: boolean) => void;

export function useNetworkStatus(onStatusChange?: StatusChangeCallback) {
  const isOnline = ref<boolean>(navigator.onLine);

  const updateStatus = () => {
    isOnline.value = navigator.onLine;

    if (isOnline.value) {
      Notif.Success('Conexión restaurada ✅'); // Notificación de éxito
    } else {
      Notif.Error('Conexión perdida ❌'); // Notificación de error
    }

    if (onStatusChange) {
      onStatusChange(isOnline.value);
    }
  };

  onMounted(() => {
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus(); // Verifica el estado al iniciar
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateStatus);
    window.removeEventListener('offline', updateStatus);
  });

  return { isOnline };
}
