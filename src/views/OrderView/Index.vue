<script lang="ts">
	export default {
		name: 'Order',
	};
</script>

<template>
	<NavigationTabs :tabs="tabs" :someProp="orderId" :orderId="orderId"></NavigationTabs>
</template>

<script setup lang="ts">
	import { computed } from '@vue/reactivity';
	import { useI18n } from 'vue-i18n';
	import { NavigationTab } from '../../types/NavigationTab.type';
	import NavigationTabs from '../../components/NavigationTabs.vue';

	const { t } = useI18n();

	const { orderId } = defineProps<{ orderId: string }>();
	
	const tabs = computed<NavigationTab[]>(() => [
		{ text: t('nested.msg1'), route: { name: 'Order', params: { orderId } } },
		{
			text: t('nested.msg2'),
			route: { name: 'OrderDiscussion', params: { orderId } },
		},
		{
			text: t('nested.msg3'),
			route: { name: 'OrderMeetup', params: { orderId } },
		},
	]);
</script>