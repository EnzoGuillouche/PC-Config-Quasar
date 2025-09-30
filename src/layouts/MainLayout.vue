<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />


      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img src="public/landscape.jpg" class="header-image absolute-top"></q-img>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item
            to="/"
            exact
            clickable
            v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Todo
              </q-item-section>
            </q-item>

            <q-item
            to="/help"
            exact
            clickable
            v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>

            <q-item
            to="/components"
            exact
            clickable
            v-ripple>
              <q-item-section avatar>
                <q-icon name="code" />
              </q-item-section>

              <q-item-section>
                Components
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="public/landscape2.jpg" style="height: 192px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="public/zesty.png">
            </q-avatar>
            <div class="text-weight-bold">Enzo GUILLOUCHE</div>
            <div>@EnzoGuillouche</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />

      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from 'stores/task-store'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.fetchTasks()
})

import { date } from 'quasar'
import { ref, computed } from 'vue'

const leftDrawerOpen = ref(false)

const todaysDate = computed(() => {
  let timeStamp = Date.now();
  return date.formatDate(timeStamp, 'dddd D MMMM YYYY')
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style lang="scss">
  .header-image {
    height: 100%;
    z-index: -1;
    opacity: 0.5;
  }
</style>