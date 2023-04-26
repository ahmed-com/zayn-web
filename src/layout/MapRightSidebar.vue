<script lang="ts">
	export default {
		name: 'MapRightSidebar',
	};
</script>

<template>
<v-card :height="desktopDrawerStyle.height" color="secondary">
	<div id="map-id" class="h-100"></div>
</v-card>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { onMounted, onUnmounted } from 'vue';
import { useSearchMapStore } from '../stores/searchMapStore';
import useLayoutManager from '../composables/useLayoutManager'

const { setMap, removeMap } = useSearchMapStore();
const { setRightDrawerSize, desktopDrawerStyle } = useLayoutManager()

setRightDrawerSize(400)

onMounted(()=> setMap('map-id'));
onUnmounted(removeMap);
</script>
