<template>
  <div ref="videoContainer" class="video-container">
    
    <!-- Overlay de carga progresiva -->
    <div v-if="videoLoaded && isLoading && !videoError" class="video-loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>Cargando video... {{ Math.round(loadingProgress) }}%</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: loadingProgress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Video normal con precarga -->
    <video
      v-if="videoLoaded"
      ref="videoElement"
      controls
      preload="metadata"
      class="video-player"
      :class="{ 
        'video-loading-opacity': isLoading, 
        'video-ready': isVideoReady,
        'video-error': videoError 
      }"
      @error="handleVideoError"
      @loadstart="handleVideoLoadStart"
      @loadedmetadata="handleVideoMetadata"
      @loadeddata="handleVideoData"
      @canplay="handleVideoCanPlay"
      @canplaythrough="handleVideoReady"
      @progress="handleVideoProgress"
    > 
      <source :src="videoSrc" type="video/mp4" />
      <p>Tu navegador no soporta la reproducción de videos HTML5.</p>
    </video>
    
    <!-- Mensaje de respaldo si el video falla -->
    <div 
      v-if="videoError" 
      class="video-fallback"
    >
      <p>No se pudo cargar el video</p>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  components: {
  },
  name: 'VideoPlayer',

  setup() {    const videoContainer = ref<HTMLElement | null>(null);
    const videoElement = ref<HTMLVideoElement | null>(null);
    const videoLoaded = ref(false); // Estado para controlar si el video se ha cargado
    const videoSrc = ref<string>('public/videos/videoexterno.mp4'); // Fuente del video desde public
    const videoError = ref(false); // Estado para manejar errores de carga
    const isVideoReady = ref(false); // Estado para saber si el video está listo para reproducir
    const isLoading = ref(false); // Estado de carga
    const loadingProgress = ref(0); // Progreso de carga (0-100)
    let observer: IntersectionObserver | null = null;

    const checkVideoFile = async () => {
      try {
        const response = await fetch(videoSrc.value, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error(`Video file not found: ${response.status}`);
        }
        console.log('Video file is accessible');
      } catch (error) {
        console.error('Video file check failed:', error);
        videoError.value = true;
      }
    };    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !videoLoaded.value) {
        console.log('Video container is in viewport, loading video...');
        videoLoaded.value = true; // Carga el video cuando está en el viewport
        
        // Opcional: Desconectar el observer después de cargar para optimizar
        if (observer && videoContainer.value) {
          observer.unobserve(videoContainer.value);
        }
      }
    };const handleVideoError = (event: Event) => {
      console.error('Error cargando el video:', videoSrc.value, event);
      videoError.value = true;
    };

    const handleVideoLoad = (event: Event) => {
      console.log('Video cargado exitosamente');
      videoError.value = false;
    };    // Nuevos manejadores de eventos para carga progresiva
    const handleVideoLoadStart = (event: Event) => {
      console.log('Video started loading');
      isLoading.value = true;
      loadingProgress.value = 0;
    };

    const handleVideoMetadata = (event: Event) => {
      console.log('Video metadata loaded');
      loadingProgress.value = 25;
    };

    const handleVideoData = (event: Event) => {
      console.log('Video data loaded');
      loadingProgress.value = 50;
    };

    const handleVideoCanPlay = (event: Event) => {
      console.log('Video can start playing');
      loadingProgress.value = 75;
    };

    const handleVideoReady = (event: Event) => {
      console.log('Video is fully loaded and ready');
      isLoading.value = false;
      isVideoReady.value = true;
      loadingProgress.value = 100;
    };

    const handleVideoProgress = (event: Event) => {
      const video = event.target as HTMLVideoElement;
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          const progress = (bufferedEnd / duration) * 100;
          loadingProgress.value = Math.min(progress, 95); // Máximo 95% hasta que esté completamente listo
          console.log(`Video buffered: ${Math.round(progress)}%`);
        }
      }
    };
    onMounted(() => {
      console.log('Component mounted, checking video file...');
      checkVideoFile();
      
      if (videoContainer.value) {        observer = new IntersectionObserver(handleIntersection, {
          root: null,
          threshold: 0.1, // Se carga cuando el 10% del elemento es visible
          rootMargin: '50px', // Comienza a cargar 50px antes de ser visible
        });
        observer.observe(videoContainer.value);
      }
    });

    onBeforeUnmount(() => {
      if (observer && videoContainer.value) {
        observer.unobserve(videoContainer.value);
      }
    });    return {
      videoContainer,
      videoElement,
      videoLoaded,
      videoSrc,
      videoError,
      isVideoReady,
      isLoading,
      loadingProgress,
      handleVideoError,
      handleVideoLoad,
      handleVideoLoadStart,
      handleVideoMetadata,
      handleVideoData,
      handleVideoCanPlay,
      handleVideoReady,
      handleVideoProgress,
    };
  },
});
</script>

<style scoped>
/* Contenedor general para el video */
.video-container {
  position: relative;
  width: 100%;
  max-width: 800px; /* Ancho máximo del video */
  margin: 0 auto; /* Centrar el video */
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

/* Video player normal */
.video-player {
  width: 100%;
  height: auto;
  display: block;
}

/* Estados del video durante la carga */
.video-loading-opacity {
  opacity: 0.3;
  transition: opacity 0.5s ease-in-out;
}

.video-ready {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.video-error {
  display: none;
}

/* Overlay de carga progresiva */
.video-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.loading-content {
  text-align: center;
  color: white;
  max-width: 300px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #333;
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 15px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #0056b3);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Mensaje de respaldo cuando el video falla */
.video-fallback {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  border-radius: 8px;
}
</style>
