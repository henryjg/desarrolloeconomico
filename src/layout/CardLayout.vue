<template>
  <div class="row">
    <div class="col-12 mt-3 px-1">
      <div class="card table-card mb-0 pb-0" >
        <div class="card-header py-0" :class="clasehead">
          <div class="row align-items-center">
            <!-- Título dinámico pasado como prop -->
            <div class="d-flex my-1">
              <div v-if="title.length>0" :class="clase" class="f-w-500 f-16 p-r-30 py-0 my-0 align-content-center">
                <i class="ph-duotone ph-grid-nine "></i>
                    {{ title }}
              </div>
              <div class="flex-grow-1 ">
                <slot name="buttons"></slot>
              </div>
            </div>
          </div>
        </div>
        <!-- Cuerpo de la tarjeta con el contenido pasado a través de slot -->
        <div class="card-body px-1 mb-0 pb-0">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
    clase: {
      type: String,
      required: true,
    },
    clasehead: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.text-primary {
  color: #007bff !important;
}

.text-end {
  text-align: end;
}

</style>
