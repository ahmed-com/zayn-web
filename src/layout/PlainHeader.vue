<script lang="ts">
	export default {
		name: 'PlainHeader',
	};
</script>

<template>
    <v-app-bar order="-1" density="compact" :name="layoutName" absolute color="primary" app>
        <v-app-bar-nav-icon v-if="hasLeftDrawer" @click="toggleLeftDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ t('brand') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon v-if="hasRightDrawer" @click="toggleRightDrawer"></v-app-bar-nav-icon>

    </v-app-bar>
</template>

<script setup lang="ts">
    import { thunkify } from "ramda";
    import { onMounted, onUnmounted } from "vue";
    import useLayoutManager from "../composables/useLayoutManager";
    import { useI18n } from "vue-i18n";
    
    const { t } = useI18n();
    const { toggleLeftDrawer, calculateHeaderSize, toggleRightDrawer, hasLeftDrawer, hasRightDrawer } = useLayoutManager();

    const { layoutName } = defineProps<{layoutName: string}>()
    
    const calculate = thunkify(calculateHeaderSize)(layoutName)
    onMounted(calculate);
    onUnmounted(calculate)
</script>