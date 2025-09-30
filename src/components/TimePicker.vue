<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="min-width: 340px">
      <q-card-section class="text-h6">Choisir une heure</q-card-section>
      <q-separator />
      <q-card-section>
        <q-time v-model="time" format24h />
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

const now = new Date()
const time = ref(
  `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
)

function emitOk() {
  onDialogOK(time.value)
}
</script>

<style scoped></style>