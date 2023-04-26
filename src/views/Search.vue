<script lang="ts">
	export default {
    name: "Search",
};
</script>

<template>
	<div class="flex-grow-1">
		{{view}} <v-btn @click="resetView"> reset </v-btn>
		<router-link :to="{ name: 'Dashboard' }"> go to Dashboard</router-link>
		<order-list :orders="orderStore.orders"></order-list>
	</div>
</template>

<script setup lang="ts">
	import { useSearchMapStore } from '../stores/searchMapStore';
	import { map, range } from 'ramda';
	import { ref, watchEffect } from 'vue';
	import { useOrderStore } from '../stores/orderStore';
	import { GeoPoint } from '../types/GeoPoint.type';
	import OrderList from '../components/OrderList.vue';

	const { setView, setMarkers } = useSearchMapStore();

	const getRandomPoint = (p: GeoPoint): GeoPoint => ({
		lat: Math.random() - 0.5 + p.lat,
		lng: Math.random() - 0.5 + p.lng
	});

	const startingPoint: GeoPoint = {
		lat: 31,
		lng: 31
	}

	const orderStore = useOrderStore()
	const view = ref<GeoPoint>(startingPoint);

	watchEffect(()=>setView(view.value));
	watchEffect(()=>orderStore.orders = map((n: number)=>({
		id: `${n}`,
		title: `the title of the order ${n}`,
		location: getRandomPoint(view.value),
		isHighlighted: false
	}))(range(1,21)))
	watchEffect(()=>{
		setMarkers(orderStore.orders.map(o=>({
			position: o.location,
			description: o.title,
			isHighlighted: o.isHighlighted
		})))
	});

	const resetView = ()=>{ view.value = getRandomPoint(view.value)}

	
</script>
