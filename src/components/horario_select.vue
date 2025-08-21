<template>
    
      <form @submit.prevent="addSchedule">
        <h4>Horario:</h4>	
         <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 px-4">
                <!-- Seleccionar Días -->
                <label class="pb-0 h6">Días:</label>
                <div class=" pb-2">
                    <div v-for="(day, index) in days" :key="index" class="form-check mb-2 d-inline-flex px-4">
                        <input 
                        class="form-check-input input-danger" 
                        :id="'campodate'+index"
                        type="checkbox" 
                        :value="day" 
                        v-model="selectedDays"
                        :disabled="assignedDays.includes(day)" 
                        />
                        <label class="form-check-label p-l-5" :for="'campodate'+index">{{ day }}</label>
                    </div>
                </div>
                <!-- Seleccionar Horario -->
                <label class="pb-0 h6">Horario:</label>
                <div class="row pb-3">
                    <div class="col-4">
                        <input class="form-control" type="time" v-model="startTime" required />  
                    </div>
                    <div class="col-4"> 
                        <input class="form-control" type="time" v-model="endTime" required />
                    </div>
                    <button class="btn btn-danger col-4" type="submit">Agregar Horario</button>
                    </div>
                </div>
            <!-- -------------------------------------------------- -->
            <div class="d-flex">
                <div class="badge text-bg-secondary f-13 mx-1 puntercursor" @click="loadScheduleFromText('Lun, Mar, Mie, Jue, Vie, Sab, Dom [08:00 - 20:00]')">Lun-Dom [8AM - 8PM]</div>
                <div class="badge text-bg-secondary f-13 mx-1 puntercursor" @click="loadScheduleFromText('Lun, Mar, Mie, Jue, Vie, Sab, Dom [08:00 - 22:00]')">Lun-Dom [8AM - 10PM]</div>
                <div class="badge text-bg-secondary f-13 mx-1 puntercursor" @click="loadScheduleFromText('Lun, Mar, Mie, Jue, Vie, Sab, Dom [00:00 - 23:59]')">24 horas</div>
            </div>
            <!-- -------------------------------------------------- -->
            <div class="col-lg-12 col-md-12 col-sm-12 px-4 pt-4">
                <!-- Mostrar el Horario Generado -->
                <div v-if="schedule.length">
                    <table class="table table-xs ">
                        <thead>
                            <tr>
                                <th style="width: 85%">Horario Elegido</th>
                                <th style="width: 15%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, index) in schedule" :key="index">
                            <td>
                                {{ entry.days.join(", ") }} [{{ entry.startTime }} - {{ entry.endTime }}]
                            </td>
                            <td>
                                <a class="avtar avtar-xs btn-link-secondary mb-1 mx-1" @click="editSchedule(index)">
                                <i class="fa fa-pen"></i>
                                </a>
                                <a class="avtar avtar-xs btn-link-danger" @click="deleteSchedule(index)">
                                <i class="fa fa-trash"></i>
                                </a>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
         </div>
        
        
      </form>
  </template>
  
<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { ListasStore } from '../stores/listasStore';

interface ScheduleEntry {
  days: string[];
  startTime: string;
  endTime: string;
}

export default defineComponent({
  name: 'ScheduleSelector',
  setup() {
    const StoreList = ListasStore();

    const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    const selectedDays = ref<string[]>([]);
    const startTime = ref<string>('');
    const endTime = ref<string>('');
    const schedule = ref<ScheduleEntry[]>([]);

    // Días asignados en los horarios actuales
    const assignedDays = computed(() => {
      return schedule.value.flatMap(entry => entry.days);
    });

    // Actualizar el formato de la cadena y guardarlo en el store
    const updateFormattedSchedule = () => {
      StoreList.HorarioLicencia = schedule.value.map(entry => {
        return `${entry.days.join(', ')} [${entry.startTime} - ${entry.endTime}]`;
      }).join('; ');
    };

    // Inicializar si ya hay texto en la variable del store
    const loadScheduleFromText = (text: string) => {
      schedule.value = text.split('; ').map(entry => {
        const [daysPart, timePart] = entry.split(' [');
        const days = daysPart.split(', ');
        const [startTime, endTime] = timePart.replace(']', '').split(' - ');
        return { days, startTime, endTime };
      });
      updateFormattedSchedule();  // Ya se puede llamar a la función ahora
    };

    onMounted(() => {
      if (StoreList.HorarioLicencia) {
        loadScheduleFromText(StoreList.HorarioLicencia);
      }
    });

    // Verificar el texto inicial en el store
    watch(
      () => StoreList.HorarioLicencia,
      (newText) => {
        if (newText) {
          loadScheduleFromText(newText);
        }
      },
      { immediate: true }  // Esto garantiza que se ejecute inmediatamente si ya hay un valor disponible
    );

    // Agregar el horario al arreglo de schedule
    const addSchedule = () => {
      if (selectedDays.value.length && startTime.value && endTime.value) {
        // Verificar si alguno de los días seleccionados ya está en la lista
        const duplicatedDays = selectedDays.value.some(day => 
          schedule.value.some(entry => entry.days.includes(day))
        );

        if (duplicatedDays) {
          alert('Algunos de los días seleccionados ya tienen un horario asignado.');
          return; // Detener la ejecución si hay días duplicados
        }

        // Si no hay duplicados, agregar el horario
        schedule.value.push({
          days: [...selectedDays.value],
          startTime: startTime.value,
          endTime: endTime.value
        });
        
        selectedDays.value = [];
        startTime.value = '';
        endTime.value = '';
        updateFormattedSchedule();
      }
    };

    // Cargar horario existente para edición
    const editSchedule = (index: number) => {
      const entry = schedule.value[index];
      selectedDays.value = [...entry.days];
      startTime.value = entry.startTime;
      endTime.value = entry.endTime;
      schedule.value.splice(index, 1); // Remover para reemplazar
      updateFormattedSchedule();
    };

    // Eliminar un horario
    const deleteSchedule = (index: number) => {
      schedule.value.splice(index, 1);
      updateFormattedSchedule();
    };

    return {
      days,
      selectedDays,
      startTime,
      endTime,
      schedule,
      assignedDays,
      addSchedule,
      editSchedule,
      deleteSchedule,
      loadScheduleFromText
    };
  }
});
</script>

  
  <style scoped>
  .puntercursor{
    cursor: pointer;
  }
  </style>
  