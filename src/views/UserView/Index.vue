<script lang="ts">
	export default {
		name: 'User',
	};
</script>

<template>
	<v-card min-height="100%" flat class="flex-grow-1">
		<v-tabs v-model="currentRoute.name" background-color="secondary">
			<v-tab
				v-for="tab in tabs"
				:key="tab.text"
				selected-class="bg-primary"
				:value="tab.route.name"
				:to="tab.route"
			>
				{{ t(tab.text) }}
			</v-tab>
		</v-tabs>

		<div class="container-wrapper">
			<router-view v-slot="{ Component, route }">
				<Transition :name="transitionName" mode="default">
					<div :key="route.path" class="route-wrapper">
						<component
							:is="Component"
							:key="route.path"
							:someProp="userId"
							:userId="userId"
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
	import { watch } from 'vue';
	import { useRoute } from 'vue-router';
	import { useI18n } from 'vue-i18n'
	import { useRtl } from 'vuetify/lib/framework.mjs';
	import { NavigationTab } from '../../types/NavigationTab.type';

	const { t } = useI18n();
	const { isRtl } = useRtl();
	const { userId } = defineProps<{ userId: string }>();
	const currentRoute = useRoute();

	const tabs = computed<NavigationTab[]>(() => [
		{ text: 'nested.msg1', route: { name: 'User', params: { userId } } },
		{
			text: 'nested.msg2',
			route: { name: 'UserDiscussion', params: { userId } },
		},
	]);
	const transitionName = ref<string>('');

	watch(
		() => currentRoute.name,
		(to, from) => {
			const toIndex = findIndex(
				(tab: NavigationTab) => tab.route.name == to,
				tabs.value
			);
			const fromIndex = findIndex(
				(tab: NavigationTab) => tab.route.name == from,
				tabs.value
			);
			const isLeft = isRtl.value ? lt(toIndex, fromIndex) : gt(toIndex, fromIndex);
			transitionName.value = `slide-${isLeft ? 'left' : 'right'}`;
		}
	);
</script>

<style scoped>
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
