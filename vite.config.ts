import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: '/licencias/',
  build: {
    sourcemap: false, // Desactiva los sourcemaps para todo el proyecto
    assetsDir: 'assets',
    outDir: 'dist'
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
        // Agrega otros plugins de PostCSS aquí
      ],
      map: false // Deshabilitar source maps
    }
  },
  assetsInclude: ['**/*.PNG'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
    // server: {
  //   host: '192.168.0.6',  // Escuchar en todas las interfaces de red (accesible en la LAN)
  //   port: 5174,        // Puerto donde se ejecuta el servidor (puedes cambiarlo si lo deseas)
  // }
})
