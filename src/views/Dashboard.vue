<script lang="ts">
	export default {
		name: 'Dashboard',
	};
</script>

<template>
	<div>
		<h1 class="flex-grow-1">
			Dashboard welcome message "localized"
			<router-link :to="{ name: 'Order', params: { orderId: 'x' } }">
				order
			</router-link>
		</h1>
		<v-text-field variant="outlined" label="address" v-model="address"></v-text-field>
		<v-progress-circular indeterminate v-if="isFetching"></v-progress-circular>
		<div v-else>{{locations}}</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { autoCompleteAddress } from '../utils/autoCompleteAddress';
	const address = ref<string>('');
	const { data, isFetching } = autoCompleteAddress(address, {refetch: true});
	const locations = computed<string[]>(()=> data.value?.map?.(res=> res.display_name) || []);
</script>