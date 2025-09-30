<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="taskStore.newTask"
        @keyup.enter="addNewTask()"
        class="col"
        square
        filled
        bg-color="white"
        placeholder="Ajouter une tâche"
        dense
      >
        <template v-slot:append>

          <q-btn
            @click="showDatePicker()"
            round
            dense
            flat
            icon="event"
          />
          <q-btn
            @click="showTimePicker()"
            round
            dense
            flat
            icon="access_time"
          />
          <q-btn
            @click="addNewTask()"
            round
            dense
            flat
            icon="add"
          />
        </template>
      </q-input>
    </div>


    <q-list class="bg-white" separator bordered>
      <task v-for="(task) in taskStore.tasks" :key="task.id" :task="task"></task>
    </q-list>


    <div v-if="taskStore.tasks.length == 0" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        Pas de tâches
      </div>
    </div>
  </q-page>
</template>

<script setup>
import task from '../components/Tasks/TaskComponent.vue'
import { useTaskStore } from '../stores/task-store.js'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import datePicker from '../components/DatePicker.vue'
import timePicker from '../components/TimePicker.vue'

const $q = useQuasar()

const taskStore = useTaskStore()
const selectedDueDate = ref(null);
const selectedDueTime = ref(null);

function addNewTask() {
  taskStore.addTask()
}

function showDatePicker() {
  $q.dialog({ component: datePicker })
  .onOk((val) => {
    selectedDueDate.value = val;
    console.log(selectedDueDate.value);
  })
}

function showTimePicker() {
  $q.dialog({ component: timePicker })
  .onOk((val) => {
    selectedDueTime.value = val;
    console.log(selectedDueTime.value);
  })
}

</script>

<style lang="scss">

</style>
