<template>
  <div class="row bg-blue-600 p-2 rounded-1 my-3 mx-1 " style="width: 380px;">
    <div class="col-3">
      <div class="h2 text-center text-white">{{ days }}</div>
      <div class="text-gray-400 f-14 pt-0 text-center">Día(s)</div>
    </div>
    <div class="col-3">
      <div class="h2 text-center text-white">{{ hours.toString().padStart(2, '0') }}</div>
      <div class="text-gray-400 f-14 text-center">Hora(s)</div>
    </div>
    <div class="col-3">
      <div class="h2 text-center text-white">{{ minutes.toString().padStart(2, '0') }}</div>
      <div class="text-gray-400 f-14 text-center"> Minuto(s)</div>
    </div>
    <div class="col-3">
      <div class="h2 text-center text-white">{{ seconds.toString().padStart(2, '0') }}</div>
      <div class="text-gray-400 f-14 text-center">Segundo(s)</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'CountdownTimer',
  props: {
    targetDate: {
      type: Date,
      required: true
    }
  },
  setup(props) {
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      
      // Ajuste para contar hasta las 23:59:59 del día objetivo
      const targetEndOfDay = new Date(props.targetDate);
      targetEndOfDay.setHours(23, 59, 59, 999);

      const difference = targetEndOfDay.getTime() - now;

      if (difference > 0) {
        days.value = Math.floor(difference / (1000 * 60 * 60 * 24));
        hours.value = Math.floor((difference / (1000 * 60 * 60)) % 24);
        minutes.value = Math.floor((difference / 1000 / 60) % 60);
        seconds.value = Math.floor((difference / 1000) % 60);
      } else {
        days.value = 0;
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
        clearInterval(timer); // Detiene el temporizador al finalizar
      }
    };

    let timer: number;

    onMounted(() => {
      calculateTimeLeft();
      timer = window.setInterval(calculateTimeLeft, 1000);
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      days,
      hours,
      minutes,
      seconds
    };
  }
});
</script>

<style scoped>
.countdown {
  gap: 10px;
  font-size: 2em;
}
</style>
