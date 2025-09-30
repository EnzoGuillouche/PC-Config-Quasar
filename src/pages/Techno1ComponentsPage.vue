<template>
  <q-page padding>
    <ul>
      <Techno1Component
      v-for="(item, index) in items"
      :key="item.id"
      :item="item"
      :index="index"
      @item-click="onItemClick"
      />
    </ul>

    <div v-if="selectedItem" class="selected-item q-mt-md q-pa-md bg-blue-1 rounded-borders">
      <h5 class="q-my-sm">Élément sélectionné :</h5>
      <p>Nom : {{ selectedItem.name }}</p>
      <p>ID : {{ selectedItem.id }}</p>
      <p>Position : {{ selectedIndex }}</p>
    </div>
  </q-page>
</template>

<script setup>
import Techno1Component from '../components/Techno1Components.vue'
import { ref } from 'vue'

const items = ref([
  {name: 'Voiture', id: 1234},
  {name: 'Bateau', id: 4567},
  {name: 'Avion', id: 975}
])

const selectedItem = ref(null)
const selectedIndex = ref(null)

const onItemClick = (item, index)=> {
  console.log('Item cliqué', item, 'à l\'index: ', index);
  selectedItem.value = item
  selectedIndex.value = index
}
</script>
