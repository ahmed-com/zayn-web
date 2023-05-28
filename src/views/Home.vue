<script lang="ts">
	export default {
		name: 'Home',
	};
</script>

<template>
	<div class="bg-texture h-100 flex-grow-1">
		<v-img :src="mainBackground"></v-img>
	</div>
</template>

<script setup lang="ts">
	import mainBackground from '../assets/main-background.jpg'
</script>