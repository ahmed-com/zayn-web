<script lang="ts">
	export default {
		name: 'HomeHeader',
	};
</script>

<template>
    <v-app-bar class="overflow-visible" order="-1" density="prominent" :name="layoutName" absolute color="secondary" app>
        <v-app-bar-nav-icon v-if="hasLeftDrawer" @click="toggleLeftDrawer"></v-app-bar-nav-icon>
        <main-search-form></main-search-form>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon v-if="hasRightDrawer" @click="toggleRightDrawer"></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<script setup lang="ts">
    import { thunkify } from "ramda";
    import { onMounted, onUnmounted } from "vue";
    import useLayoutManager from "../composables/useLayoutManager";
import MainSearchForm from "../components/forms/MainSearchForm.vue";
    const { toggleLeftDrawer, calculateHeaderSize, toggleRightDrawer, hasLeftDrawer, hasRightDrawer } = useLayoutManager();

    const { layoutName } = defineProps<{layoutName: string}>()
    
    const calculate = thunkify(calculateHeaderSize)(layoutName)
    onMounted(calculate);
    onUnmounted(calculate)
</script>