<template>
	<v-fab-transition>
		<v-btn
			v-show="showFAB"
			color="primary"
            icon="mdi-arrow-down-bold"
			class="position-bottom-2 position-fixed"
            :class="isRtl ? 'position-left-2' : 'position-right-2'"
			size="x-large"
            elevation="6"
            v-bind="$attrs"
		>
		</v-btn>
	</v-fab-transition>
</template>

<script setup lang="ts">
    import { useRtl } from 'vuetify/lib/framework.mjs';
    const { showFAB } = defineProps<{showFAB: boolean}>();
    const { isRtl } = useRtl();
</script>