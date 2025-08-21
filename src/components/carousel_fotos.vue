<template>
  <div :id="carouselId" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="carousel-item"
        :class="{ active: index === 0 }"
        data-bs-interval="4000"
      >
        <div class="image-container">
          <img class="img-fluid d-block w-100" :src="HOST_URL+image.url" />
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      :data-bs-target="'#' + carouselId"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      :data-bs-target="'#' + carouselId"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { HOST_URL } from '../config';
import { Foto } from '../types/interfaces';

export default defineComponent({
  name: 'Slider_Fotos',
  props: {
    images: {
      type: Array as () => Foto[],
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const carouselId = props.id; // Pasamos el id desde las props
    const defaultImage = { url: '/assets/imgdefault.avif' };
    const fotos = ref<Foto[]>([]);

    onMounted(() => {
      initializeCarousel();
    });

    const initializeCarousel = () => {
      const myCarouselElement = document.querySelector(`#${carouselId}`);
      if (myCarouselElement && window.bootstrap) {
        new window.bootstrap.Carousel(myCarouselElement, {
          interval: 2000,
          wrap: true
        });
      }
    };

    return {
      HOST_URL,
      fotos,
      carouselId
    };
  }
});
</script>

<style lang="scss" scoped>
.image-container {
  width: 100%;
  height: 0;
  padding-bottom: 62.5%; /* 4:3 aspect ratio */
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.image-container img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover; /* La imagen cubre completamente el contenedor */
  transform: translate(-50%, -50%);
}
</style>
