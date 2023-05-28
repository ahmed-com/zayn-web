<script lang="ts">
	export default {
		name: 'MarkableText',
	};
</script>

<template>
	<span class="d-inline-grid">
		<span v-if="isMarkable" class="grid-row-1 grid-column-1 no-pointer-events text-transparent white-space-pre"
			>{{ part_1 }} <mark class="trimmed text-transparent bg-mark">{{ marked }}</mark>
			{{ part_2 }}
		</span>
		<span class="grid-row-1 grid-column-1">{{ text }}</span>
	</span>
</template>

<script lang="ts" setup>
	import { computed, toRefs } from 'vue';

	type Props = {
		text: string;
		start?: number;
		end?: number;
		match?: string;
		unmark?: boolean;
		ignoreCase?: boolean;
	};

	const props: Props = defineProps<Props>();
	const { text, start, end, match, unmark, ignoreCase } = toRefs<Props>(props);

	const startIndex = computed<number>(() => {
		if (start?.value !== undefined) return start?.value;
		if (match?.value === undefined) return 0;
		if (ignoreCase?.value) return text.value.toLowerCase().indexOf(match?.value.toLowerCase());
		return text.value.indexOf(match?.value);
	});

	const endIndex = computed<number>(() => {
		if (end?.value !== undefined) return end?.value;
		if (match?.value === undefined) return text.value.length;
		return startIndex.value + match?.value.length;
	});

	const part_1 = computed<string>(() =>
		text.value.slice(0, startIndex.value)
	);
	const part_2 = computed<string>(() =>
		text.value.slice(endIndex.value, text.value.length)
	);
	const marked = computed<string>(() =>
		text.value.slice(startIndex.value, endIndex.value)
	);
	const isMarkable = computed<boolean>(()=> {
		if(unmark?.value) return false;
		if(start?.value !== undefined && start.value < 0) return false;
		if(end?.value !== undefined && end.value > text.value.length) return false;
		if(match?.value !== undefined && match.value.length > text.value.length) return false;
		if(startIndex.value === -1) return false;
		return true;
	})
</script>

<style scoped>
	.text-transparent{
		color: transparent !important;
	}
	.trimmed {
		margin-right: -0.2em;
		margin-left: -0.2em;
	}
</style>
