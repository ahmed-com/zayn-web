<script lang="ts">
	export default {
		name: 'MainLeftSidebar',
	};
</script>

<template>
<v-card height="100%" color="secondary">
	<v-list>
		<v-list-item
			prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
			title="John Leider"
			subtitle="john@vuetifyjs.com"
		>
			<template v-slot:append>
				<v-list-item-avatar end>
					<v-btn
						size="small"
						variant="text"
						icon="mdi-menu-down"
					></v-btn>
				</v-list-item-avatar>
			</template>
		</v-list-item>
	</v-list>
	<v-divider></v-divider>
	<v-list class="bg-trasnsparent h-100" nav dense>
		<v-list-item
			v-for="(item, i) in items"
			:key="i"
			:value="item"
			active-color="primary"
		>
			<v-list-item-avatar>
				<v-icon :icon="item.icon"></v-icon>
			</v-list-item-avatar>

			<v-list-item-title v-text="item.text"></v-list-item-title>
		</v-list-item>
	</v-list>
</v-card>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	// const selectedItem = ref(0);

	const items = ref([
		{ text: 'My Files', icon: 'mdi-folder' },
		{ text: 'Shared with me', icon: 'mdi-account-multiple' },
		{ text: 'Starred', icon: 'mdi-star' },
		{ text: 'Recent', icon: 'mdi-history' },
		{ text: 'Offline', icon: 'mdi-check-circle' },
		{ text: 'Uploads', icon: 'mdi-upload' },
		{ text: 'Backups', icon: 'mdi-cloud-upload' },
	]);
</script>
