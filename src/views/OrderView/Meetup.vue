<script lang="ts">
	export default {
		name: 'OrderMeetup',
	};
</script>

<template>
    <v-sheet height="250" color="purple">
        the order meetup
        orderId: {{orderId}}
        someProp: {{someProp}}
        <br>
        <router-link :to="{name:'Search'}"> go to search </router-link>
    </v-sheet>
</template>

<script setup lang="ts">
    const {orderId, someProp} = defineProps<{orderId: string, someProp: string}>()
</script>