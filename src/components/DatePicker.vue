<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="min-width: 340px">
      <q-card-section class="text-h6">Choisir une date</q-card-section>
      <q-separator />
      <q-card-section>
        <q-date v-model="date" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="primary" @click="onDialogCancel" />
        <q-btn flat label="Valider" color="primary" @click="emitOk" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'

const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } = useDialogPluginComponent()
defineEmits(['ok', 'hide', 'cancel'])

const today = new Date()
const date = ref(
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate(),
  ).padStart(2, '0')}`,
)

function emitOk() {
  onDialogOK(date.value)
}
</script>

<style scoped></style>