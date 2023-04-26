<script lang="ts">
	export default {
		name: 'ChatFooter',
	};
</script>

<template>
	<v-footer class="position-fixed position-bottom-0 w-100 bg-grey">Chat Footer <v-btn @click="addMessage">add message</v-btn></v-footer>
</template>

<script setup lang="ts">
	import { useMessages } from '../stores/useMessages';
	const {addMessage} = useMessages()
</script>