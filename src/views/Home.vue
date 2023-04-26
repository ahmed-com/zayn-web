<script lang="ts">
	export default {
		name: 'Home',
	};
</script>

<template>
	<div class="bg-texture h-100 flex-grow-1">
		{{t('homeMsg')}}
		<br>
		<v-text-field variant="outlined" label="address" v-model="address"></v-text-field>
        <v-btn @click="execute"> search </v-btn>
        <v-progress-circular indeterminate v-if="isFetching"></v-progress-circular>
        <div v-else>{{locations}}</div>
		<router-link :to="{ name: 'Search' }">go to search</router-link>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n';
	import { addressToLocations } from "../utils/addressToLocation";
	import { ref, computed } from 'vue';
	const {t}= useI18n();

    const address = ref<string>('');
    const { data, isFetching, execute } = addressToLocations(address, {immediate: false});
    const locations = computed<string[]>(()=>data.value?.map?.(res=> res.display_name) || [])
</script>