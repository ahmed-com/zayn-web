<script lang="ts">
	export default {
		name: 'NavigationTabs',
	};
</script>

<template>
	<v-card min-height="100%" flat class="flex-grow-1 bg-texture">
		<div
			class="tabs-container w-100 tab-height bg-secondary d-flex flex-row"
		>
			<div
				class="position-absolute h-100 bg-primary active-identifier transition-all"
				:class="{
					'position-right-0': isRtl,
					'position-left-0': !isRtl
				}"
				:style="activeIdentifierStyle"
			></div>
			<div
				v-for="tab in tabs"
				:key="tab.text"
				ref="tabsElements"
				class="h-100 bg-transparent"
			>
				<router-link
					:to="tab.route"
					class="d-flex align-center px-4 h-100 text-decoration-none font-weight-bold transition-all"
					:class="{
						'text-secondary': currentRoute.name == tab.route.name,
						'text-primary': currentRoute.name != tab.route.name,
					}"
				>
					{{ tab.text }}
				</router-link>
			</div>
		</div>

		<div class="container-wrapper margin-for-tabs">
			<router-view v-slot="{ Component, route }">
				<Transition :name="transitionName" mode="default">
					<div :key="route.path" class="route-wrapper">
						<component
							:is="Component"
							:key="route.path"
							v-bind="$attrs"
						></component>
					</div>
				</Transition>
			</router-view>
		</div>
	</v-card>
</template>

<script setup lang="ts">
	import { computed, ref } from '@vue/reactivity';
	import { findIndex, gt, lt } from 'ramda';
	import { CSSProperties, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { useRtl } from 'vuetify/lib/framework.mjs';
	import { NavigationTab } from '../types/NavigationTab.type';
	import useLayoutManager from '../composables/useLayoutManager';

	const { headerSize } = useLayoutManager();
	const tabsTopValue = computed(() => `${headerSize.value}px`);

	const { isRtl } = useRtl();

	const currentRoute = useRoute();

	const {tabs} = defineProps<{tabs: NavigationTab[]}>();

	const transitionName = ref<string>('');
	const tabsElements = ref<HTMLElement[]>([]);
	const activeIdentifierStyle = computed<CSSProperties>(() => {
		let activeWidth: number = 0;
		const activeTranslation: number = tabsElements.value.reduce(
			(acc: number, el: HTMLElement, index: number) => {
				const elementWidth: number = el.clientWidth;
				if (currentRoute.name == tabs[index].route.name)
					activeWidth = elementWidth;
				if (activeWidth) return acc;
				return acc + elementWidth;
			},
			0
		);

		return {
			width: `${activeWidth}px`,
			transform: `translateX(${isRtl.value ? '-': ''}${activeTranslation}px)`,
		};
	});

	watch(
		() => currentRoute.name,
		(to, from) => {
			const toIndex = findIndex(
				(tab: NavigationTab) => tab.route.name == to,
				tabs
			);
			const fromIndex = findIndex(
				(tab: NavigationTab) => tab.route.name == from,
				tabs
			);
			const isLeft = isRtl.value
				? lt(toIndex, fromIndex)
				: gt(toIndex, fromIndex);
			transitionName.value = `slide-${isLeft ? 'left' : 'right'}`;
		}
	);
</script>

<style scoped lang="scss">
	@import '../styles/variables';

	.active-identifier {
		z-index: -1;
	}

	.transition-all{
		transition: all 300ms ease-in-out;
	}
	.tabs-container {
		position: fixed;
		top: v-bind('tabsTopValue');
		z-index: 1;
	}

	.tab-height {
		height: $tab-height;
	}

	.margin-for-tabs {
		margin-top: $tab-height;
	}
	.container-wrapper {
		width: 100%;
		min-height: 100%;
		position: relative;
	}

	.route-wrapper {
		width: 100%;
	}

	.slide-left-enter-active,
	.slide-left-leave-active,
	.slide-right-enter-active,
	.slide-right-leave-active {
		transition: all 300ms ease-out;
		position: absolute;
	}
	.slide-left-enter-to,
	.slide-right-leave-from {
		position: absolute;
		right: 0%;
	}
	.slide-left-enter-from,
	.slide-right-leave-to {
		position: absolute;
		right: -100%;
	}
	.slide-left-leave-to,
	.slide-right-enter-from {
		position: absolute;
		left: -100%;
	}
	.slide-left-leave-from,
	.slide-right-enter-to {
		position: absolute;
		left: 0%;
	}
</style>
