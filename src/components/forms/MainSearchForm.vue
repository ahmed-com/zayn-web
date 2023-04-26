<script lang="ts">
	export default {
		name: 'MainSearchForm',
	};
</script>

<template>
	<main-desktop-search-bar
		class="w-75"
		v-model:address="address"
		v-model:searchTerm="searchTerm"
		address-placeholder="Location"
		search-placeholder="Keyword"
		:search-suggestions="searchSuggestions"
		:is-search-suggestions-loading="false"
		:is-address-suggestions-loading="isAddressSuggestionsLoading"
		:is-submitting="false"
		:address-suggestions="addressSuggestions"
		:search-typeahead="searchTypeadead"
		:address-typeahead="addressSuggestions?.[0]?.description || ''"
		search-label="Order"
		address-label="Address"
		@submit="onSubmit"
	>
		<template #address-inner-end="{ props }">
			<v-progress-circular
				size="25"
				indeterminate
				color="primary"
				class="bg-background"
				v-bind="props"
				v-if="isGeoAddressLoading"
			></v-progress-circular>
			<v-btn
				v-else
				icon="mdi-crosshairs-gps"
				size="x-small"
				class="bg-background"
				color="primary"
				v-bind="props"
				@click="getGeoAddress"
			></v-btn>
		</template>
	</main-desktop-search-bar>
</template>

<script setup lang="ts">
	import { computed, ref, watch, watchEffect } from 'vue';
	import { Address } from '../../types/Address.type';
	import MainDesktopSearchBar from '../inputs/MainDesktopSearchBar.vue';
	import { autoCompleteAddress } from '../../utils/autoCompleteAddress';
	import { locationToAddress } from '../../utils/locationToAddress';
	import { any, propEq } from 'ramda';
	import { useGeoAdddress } from '../../composables/useGeoAddress';

	const address = ref<Address>({ description: '' });
	const searchTerm = ref<string>('');
	const incompleteAddress = ref<string>('');

	const {
		geoAddress,
		error: geoAddressError,
		isLoading: isGeoAddressLoading,
		exec: getGeoAddress,
	} = useGeoAdddress();
	watch(geoAddress, (value: Address | null)=>{
		if(value !== null) address.value = value;
	})

	const { data, isFetching: isAddressSuggestionsLoading } = autoCompleteAddress(incompleteAddress, { refetch: true });
	const addressSuggestions = computed<Address[]>(
		() =>
			data.value?.map?.((res) => ({
				description: res.display_name,
				point: {
					lat: +res.lat,
					lng: +res.lon,
				},
			})) || []
	);
	const isAddressComplete = computed<boolean>(() =>
		any(propEq('description', address.value.description), addressSuggestions.value)
	);

	watchEffect(() => {
		if (!isAddressComplete.value) incompleteAddress.value = address.value.description;
	});

	const searchSuggestions = ref<string[]>([
		'كلام عربي',
		'something 2',
		'something 3',
		'something 4',
		'something 5',
		'something 6',
		'another something 2',
		'another something 3',
		'another something 4',
		'another something 5',
		'another something 6',
	]);
	const searchTypeadead = ref<string>('restaurant');

	const onSubmit = () => console.log(address.value);
</script>
