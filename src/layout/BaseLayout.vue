<script lang="ts">
	export default {
		name: 'Layout',
	};
</script>

<template>
	<slot :name="_HEADER_SLOT_NAME_" :layoutName="_HEADER_NAME_" ></slot>

	<template v-if="!isDesktop && hasLeftDrawer">
		<v-navigation-drawer :name="_LEFT_DRAWER_NAME_" app v-model="leftDrawer">
			<slot :name="_LEFT_DRAWER_SLOT_NAME_"></slot>
		</v-navigation-drawer>
	</template>

	<template v-if="hasRightDrawer">
		<v-navigation-drawer
			order="-1"
			:name="_RIGHT_DRAWER_NAME_"
			app
			v-model="rightDrawer"
			location="right"
			:width="rightDrawerSize"
		>
			<slot :name="_RIGHT_DRAWER_SLOT_NAME_"></slot>
		</v-navigation-drawer>
	</template>

	<v-main v-if="!isDesktop">
		<slot></slot>
	</v-main>

	<DesktopMain v-if="isDesktop" :drawer-layout-name="_LEFT_DRAWER_NAME_">
		<template #drawer>
			<slot :name="_LEFT_DRAWER_SLOT_NAME_"></slot>
		</template>

		<template #default>
			<slot></slot>
		</template>
	</DesktopMain>

	<v-footer :name="_FOOTER_NAME_" :order="footerOrder" app absolute class="pa-0">
		<slot :name="_FOOTER_SLOT_NAME_"></slot>
	</v-footer>
</template>

<script setup lang="ts">
	import { thunkify } from 'ramda';
	import { ref, watch } from 'vue';
	import { useRoute } from 'vue-router';
	import useLayoutManager from '../composables/useLayoutManager';
	import DesktopMain from './DesktopMain.vue';

	const route = useRoute();

	const _HEADER_NAME_ = 'header';
	const _LEFT_DRAWER_NAME_ = 'left-drawer';
	const _RIGHT_DRAWER_NAME_ = 'right-drawer';
	const _FOOTER_NAME_ = 'footer';

	const _HEADER_SLOT_NAME_ = 'header';
	const _LEFT_DRAWER_SLOT_NAME_ = 'left-drawer';
	const _RIGHT_DRAWER_SLOT_NAME_ = 'right-drawer';
	const _FOOTER_SLOT_NAME_ = 'footer';

	const {
		isDesktop,
		leftDrawer,
		rightDrawer,
		footerOrder,
		calculateLayout,
		hasLeftDrawer,
		hasRightDrawer,
		setLeftDrawer,
		setRightDrawer,
		rightDrawerSize
	} = useLayoutManager();
	const calculate = thunkify(calculateLayout)(
		{
			leftDrawerSlotName: _LEFT_DRAWER_SLOT_NAME_,
			rightDrawerSlotName: _RIGHT_DRAWER_SLOT_NAME_,
		},
		{
			rightDrawerName: _RIGHT_DRAWER_NAME_,
			footerName: _FOOTER_NAME_
		}
	);

	calculate();
	watch(() => useRoute()?.name, calculate);
	watch(()=> route.name, ()=> {
		setLeftDrawer(!!route?.matched?.[0]?.components?.leftDrawer || false)
		setRightDrawer(!!route?.matched?.[0]?.components?.rightDrawer || false)
	})
</script>