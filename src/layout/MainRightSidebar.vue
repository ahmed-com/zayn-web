<script lang="ts">
export default {
  name: 'MainRightSidebar',
};
</script>

<template>
  <v-card :height="desktopDrawerStyle.height" color="secondary">
      <div v-show="toggleMap" id="map-id" class="h-100 bg-surface"></div>
      <div class="overflow-y-scroll scrollbar-hidden h-100" v-show="!toggleMap"> 
        <v-btn @click="rightSidebarStore.toggle" size="x-large" density="compact" icon="mdi-arrow-left" class="bg-secondary text-primary"></v-btn>
        <v-card>
          <v-card-title> Manage {{ row?.id }} </v-card-title>
          <div v-for="(v, k) in row">
            <v-card-text>
              <v-text-field
                :label="k + ''"
                :value="v"
              ></v-text-field>
            </v-card-text>
          </div>
        </v-card>
      </div>
  </v-card>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { onMounted, onUnmounted} from 'vue';
import { useSearchMapStore } from '../stores/searchMapStore';
import useLayoutManager from '../composables/useLayoutManager'
import { useRightSidebarStore } from '../stores/rightSidebarStore';
import { storeToRefs } from 'pinia';

const rightSidebarStore = useRightSidebarStore();

const { toggleMap, row } = storeToRefs(rightSidebarStore);
const { setMap, removeMap } = useSearchMapStore();
const { setRightDrawerSize, desktopDrawerStyle } = useLayoutManager()

setRightDrawerSize(400)



onMounted(() => setMap('map-id'));
onUnmounted(removeMap);
</script>