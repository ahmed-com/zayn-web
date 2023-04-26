<script lang="ts">
	export default {
		name: 'UserInfo',
	};
</script>

<template>
    <v-sheet height="250" color="blue">
        the user info
        userId: {{userId}}
        someProp: {{someProp}}
        <br>
        <router-link :to="{name:'Dashboard'}"> Dashboard </router-link>
    </v-sheet>
</template>

<script setup lang="ts">
    const {userId, someProp} = defineProps<{userId: string, someProp: string}>()
</script>