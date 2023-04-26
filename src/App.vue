<script lang="ts">
	export default {
		name: 'App',
	};
</script>

<template>
	<v-app>
		<BaseLayout>
			<template  #header="{layoutName}">
				<router-view name="header" v-slot="{Component}">
					<component
						:is="Component"
						:layoutName="layoutName"
					></component>
				</router-view>
			</template>

			<template #left-drawer>
				<router-view name="leftDrawer"></router-view>
			</template>

			<template #right-drawer>
				<router-view name="rightDrawer"></router-view>
			</template>

			<template #default>
				<router-view name="main"></router-view>
			</template>

			<template #footer>
				<router-view name="footer"></router-view>
			</template>
		</BaseLayout>
	</v-app>
</template>

<script setup lang="ts">
	import BaseLayout from './layout/BaseLayout.vue';
</script>