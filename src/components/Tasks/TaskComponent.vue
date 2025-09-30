<template>
  <q-item
    @click="toggleTask(task)"
    :class="{
      done: task.done,
      'bg-red-1': !task.done,
      'bg-green-1': task.done,
    }"
    clickable
    v-ripple
  >
    <q-item-section avatar>
      <q-checkbox
        :model-value="task.done"
        class="no-pointer-events"
        color="primary"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ task.title }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="task.done" side>
      <q-btn
        @click.stop="removeTask(task)"
        flat
        round
        dense
        color="primary"
        icon="delete"
      />
    </q-item-section>

    <q-item-section avatar>
      <q-icon name="calendar_today" />
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>{{ task.due_date }}</q-item-label>
      <q-item-label caption>{{ task.due_time }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useTaskStore } from '../../stores/task-store.js'

const $q = useQuasar()
const taskStore = useTaskStore()

defineProps({
  task: Object
})

function toggleTask(task) {
  taskStore.alterTask(task)
}

function removeTask(task) {
  $q.dialog({
      title: 'Confirmation',
      message: 'Vraiment supprimer ?',
      cancel: true,
      persistent: true,
    }).onOk(() => {
      taskStore.deleteTask(task.id)
      $q.notify('Tâche supprimée')
    })
}
</script>

<style scoped lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}

.no-tasks {
  opacity: 0.5;
}
</style>