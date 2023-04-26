<script lang="ts">
	export default {
		name: 'MainFooter',
	};
</script>

<template>
    <div class="pa-16 bg-primary w-100">
		<v-select
			v-model="currentLang"
			:items="languages"
			item-title="native_name"
			item-value="value"
			label="Language"
			return-object
			single-line
		></v-select>
		<v-select
			v-model="currentTheme"
			:items="themes"
			label="Themes"
			single-line
		></v-select>
	</div>
</template>

<script setup lang="ts">
import { usePreferences } from '../composables/usePreferences';
const {languages, currentLang, currentTheme, themes} = usePreferences()
</script>