import { onMounted } from 'vue'

export function useVersionCheck() {
  let localVersion = '';

  // Leer la versión local al cargar la app
  fetch('version.json', { cache: 'no-store' })
    .then(res => res.json())
    .then(data => {
      localVersion = data.version;
    });

  const checkVersion = async () => {
    try {
      const response = await fetch('version.json', { cache: 'no-store' });
      const data = await response.json();
      if (data.version !== localVersion && localVersion !== '') {
        window.location.reload();
      }
    } catch (error) {
      console.error('No se pudo verificar la versión', error);
    }
  };

  onMounted(() => {
    setInterval(checkVersion, 60000);
  });
}