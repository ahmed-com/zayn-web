<script lang="ts">
	export default {
		name: 'MainDesktopSearchBar',
	};
</script>

<template>
	<form @submit.prevent="emit('submit')" class="main-grid elevation-6">
		<div
			class="grid-row-1 grid-column-1 input-grid rounded-ts pt-2 bg-background"
			:class="{ 'rounded-bs': !showSearchSuggestions }"
			v-click-outside="hideSearchSuggestions"
		>
			<label
				v-if="searchLabel"
				for="search-input"
				class="grid-row-1 grid-column-1 d-flex align-center text-grey-darken-2 px-4 font-weight-bold"
			>
				{{ searchLabel }}
			</label>
			<span
				class="grid-row-1 grid-column-2 d-flex align-center text-grey px-2 white-space-nowrap overflow-x-hidden"
				>{{ computedSearchTypeahead }}</span
			>
			<input
				type="text"
				@focus="showSearchSuggestions = true"
				@keydown.tab="onSearchTabbed"
				@keydown.up.prevent="setActiveSearchSuggestion(activeSearchSuggestion - 1)"
				@keydown.down.prevent="setActiveSearchSuggestion(activeSearchSuggestion + 1)"
				class="grid-row-1 grid-column-2 bg-transparent text-black px-2"
				autocomplete="off"
				:placeholder="searchPlaceholder"
				v-model="computedSearchTerm"
				id="search-input"
			/>
			<div class="h-0 grid-row-2 grid-column-1-3">
				<v-scroll-y-transition>
					<div
						class="bg-background w-100 pa-4 rounded-b overflow-y-auto scrollbar-hidden suggestions-list elevation-compliment-6"
						v-if="computedShowSearchSuggestions"
					>
						<div v-if="isSearchSuggestionsLoading" class="center-grid w-100 py-4">
							<v-progress-circular color="primary" indeterminate></v-progress-circular>
						</div>
						<ul class="list-style-none" v-else>
							<v-hover
								v-for="(suggestion, index) in searchSuggestions"
								:key="suggestion"
								@update:model-value="(p) => hoverSearchSuggestion(index)(p)"
								v-slot="{ props }"
							>
								<li
									class="cursor-pointer pa-2 rounded overflow-x-hidden white-space-nowrap"
									:class="{
										'bg-primary-lighten-3': activeSearchSuggestion === index,
									}"
									@click="setSearchTerm(suggestion)"
									v-bind="props"
									ref="searchSuggestionsEls"
								>
									<markable-text
										:unmark="activeSearchSuggestion === index"
										:text="suggestion"
										:match="computedSearchTerm"
									></markable-text>
								</li>
							</v-hover>
						</ul>
					</div>
				</v-scroll-y-transition>
			</div>
		</div>
		<div class="grid-row-1 grid-column-2 bg-grey">
			<v-divider vertical></v-divider>
		</div>
		<div
			class="grid-row-1 grid-column-3 pt-2 input-grid bg-background position-relative"
			v-click-outside="hideAddressSuggestions"
		>
			<label
				v-if="addressLabel"
				for="address-input"
				class="grid-row-1 grid-column-1 d-flex align-center text-grey-darken-2 px-4 font-weight-bold"
			>
				{{ addressLabel }}
			</label>
			<span
				class="grid-row-1 grid-column-2 d-flex align-center text-grey px-2 white-space-nowrap overflow-x-hidden"
				>{{ computedAddressTypeahead }}</span
			>
			<input
				type="text"
				@focus="showAddressSuggestions = true"
				@keydown.tab="onAddressTabbed"
				@keydown.up.prevent="setActiveAddressSuggestion(activeAddressSuggestion - 1)"
				@keydown.down.prevent="setActiveAddressSuggestion(activeAddressSuggestion + 1)"
				class="grid-row-1 grid-column-2 bg-transparent text-black px-2"
				autocomplete="off"
				:placeholder="addressPlaceholder"
				v-model="computedAddress.description"
				id="address-input"
			/>
			<slot
				name="address-inner-end"
				:props="{
					class: 'grid-row-1 grid-column-2 position-absolute position-right-0 ma-1',
				}"
			>
			</slot>
			<div class="h-0 grid-row-2 grid-column-1-3">
				<v-scroll-y-transition>
					<div
						class="bg-background w-100 pa-4 rounded-b overflow-y-auto scrollbar-hidden suggestions-list elevation-compliment-6"
						v-if="computedShowAddressSuggestions"
					>
						<div v-if="isAddressSuggestionsLoading" class="center-grid w-100 py-4">
							<v-progress-circular color="primary" indeterminate></v-progress-circular>
						</div>
						<ul class="list-style-none" v-else>
							<v-hover
								v-for="(suggestion, index) in addressSuggestions"
								:key="suggestion.description"
								@update:model-value="(p) => hoverAddressSuggestion(index)(p)"
								v-slot="{ props }"
							>
								<li
									class="cursor-pointer pa-2 rounded overflow-x-hidden white-space-nowrap"
									:class="{
										'bg-primary-lighten-3': activeAddressSuggestion === index,
									}"
									@click="setAddress(suggestion)"
									v-bind="props"
									ref="addressSuggestionsEls"
								>
									<markable-text
										:unmark="activeAddressSuggestion === index"
										:text="suggestion.description"
										:match="computedAddress.description"
									></markable-text>
								</li>
							</v-hover>
						</ul>
					</div>
				</v-scroll-y-transition>
			</div>
		</div>
		<button type="submit" class="px-5 py-3 grid-row-1 grid-column-4 bg-primary rounded-e">
			<v-progress-circular size="25" indeterminate color="secondary" v-if="isSubmitting"></v-progress-circular>
			<img v-else width="20" :src="searchIcon" alt="" />
		</button>
	</form>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs } from 'vue';
	import searchIcon from '../../assets/magnifying.svg';
	import { Address } from '../../types/Address.type';
	import MarkableText from '../MarkableText.vue';
	import { scrollIntoView } from '../../utils/scrollIntoView';
	import componentsConfig from '../../config/components.config.json';

	type Props = {
		searchTerm: string;
		address: Address;
		searchPlaceholder: string;
		addressPlaceholder: string;
		searchTypeahead: string;
		addressTypeahead: string;
		searchSuggestions: string[];
		addressSuggestions: Address[];
		isSearchSuggestionsLoading: boolean;
		isAddressSuggestionsLoading: boolean;
		isSubmitting: boolean;
		searchLabel?: string;
		addressLabel?: string;
	};

	const props: Props = withDefaults(defineProps<Props>(), {
		searchTerm: '',
		address: () => ({ description: '' }),
		searchPlaceholder: '',
		addressPlaceholder: '',
		searchTypeahead: '',
		addressTypeahead: '',
		isAddressSuggestionsLoading: false,
		isSearchSuggestionsLoading: false,
		isSubmitting: false,
		searchSuggestions: () => [],
		addressSuggestions: () => [],
	});

	const {
		searchTerm,
		address,
		searchLabel,
		addressLabel,
		searchPlaceholder,
		addressPlaceholder,
		searchSuggestions,
		addressSuggestions,
		searchTypeahead,
		addressTypeahead,
		isSubmitting,
		isSearchSuggestionsLoading,
		isAddressSuggestionsLoading,
	} = toRefs(props);

	const emit = defineEmits<{
		(event: 'update:searchTerm', searchTerm: string): void;
		(event: 'update:address', address: Address): void;
		(event: 'submit'): void;
	}>();

	const showAddressSuggestions = ref<boolean>(false);
	const showSearchSuggestions = ref<boolean>(false);
	const activeSearchSuggestion = ref<number>(searchSuggestions.value.length);
	const activeAddressSuggestion = ref<number>(addressSuggestions.value.length);
	const searchSuggestionsEls = ref<null | HTMLElement[]>([]);
	const addressSuggestionsEls = ref<null | HTMLElement[]>([]);

	const computedSearchTypeahead = computed<string>(() => {
		if (!searchTerm.value || searchTerm.value.length >= componentsConfig.typeadheadMaxLength) return '';
		if (!searchTypeahead.value.toLowerCase().startsWith(searchTerm.value.toLowerCase())) return '';
		return searchTerm.value + searchTypeahead.value.slice(searchTerm.value.length, searchTypeahead.value.length);
	});
	const computedAddressTypeahead = computed<string>(() => {
		if (!address.value.description || address.value.description.length >= componentsConfig.typeadheadMaxLength)
			return '';
		if (!addressTypeahead.value.toLowerCase().startsWith(address.value.description.toLowerCase())) return '';
		return (
			address.value.description +
			addressTypeahead.value.slice(address.value.description.length, addressTypeahead.value.length)
		);
	});
	const computedShowSearchSuggestions = computed<boolean>(
		() => showSearchSuggestions.value && (isSearchSuggestionsLoading.value || !!searchSuggestions.value.length)
	);
	const computedShowAddressSuggestions = computed<boolean>(
		() => showAddressSuggestions.value && (isAddressSuggestionsLoading.value || !!addressSuggestions.value.length)
	);
	const computedSearchTerm = computed<string>({
		get() {
			return searchTerm.value;
		},

		set(value: string) {
			emit('update:searchTerm', value);
		},
	});
	const computedAddress = computed<Address>({
		get() {
			return address.value;
		},

		set(value: Address) {
			emit('update:address', value);
		},
	});

	const setSearchTerm = (value: string) => (computedSearchTerm.value = value);
	const setAddress = ({ description, point }: Address) => (computedAddress.value = { description, point });

	const hideSearchSuggestions = () => {
		showSearchSuggestions.value = false;
		activeSearchSuggestion.value = searchSuggestions.value.length;
	};
	const hideAddressSuggestions = () => {
		showAddressSuggestions.value = false;
		activeAddressSuggestion.value = addressSuggestions.value.length;
	};

	const onSearchTabbed = () => {
		if (computedSearchTypeahead.value) computedSearchTerm.value = computedSearchTypeahead.value;
		if (showSearchSuggestions.value) hideSearchSuggestions();
	};
	const onAddressTabbed = () => {
		if (computedAddressTypeahead.value)
			computedAddress.value = {
				description: computedAddressTypeahead.value,
			};
		if (showAddressSuggestions.value) hideAddressSuggestions();
	};

	const setActiveSearchSuggestion = (n: number) => {
		let activeIndex: number = n;
		if (n > searchSuggestions.value.length) activeIndex = 0;
		if (n < 0) activeIndex = searchSuggestions.value.length;
		activeSearchSuggestion.value = activeIndex;
		if (activeIndex === searchSuggestions.value.length) return;
		scrollIntoView(searchSuggestionsEls.value![activeIndex], { behavior: 'auto', block: 'end', inline: 'nearest' });
		setSearchTerm(searchSuggestions.value[activeIndex]);
	};
	const setActiveAddressSuggestion = (n: number) => {
		let activeIndex: number = n;
		if (n > addressSuggestions.value.length) activeIndex = 0;
		if (n < 0) activeIndex = addressSuggestions.value.length;
		activeAddressSuggestion.value = activeIndex;
		if (activeIndex === addressSuggestions.value.length) return;
		scrollIntoView(addressSuggestionsEls.value![activeIndex], {
			behavior: 'auto',
			block: 'end',
			inline: 'nearest',
		});
		setAddress(addressSuggestions.value[activeIndex]);
	};

	const hoverSearchSuggestion = (i: number) => (p: boolean) =>
		(activeSearchSuggestion.value = p ? i : searchSuggestions.value.length);
	const hoverAddressSuggestion = (i: number) => (p: boolean) =>
		(activeAddressSuggestion.value = p ? i : addressSuggestions.value.length);
</script>

<style scoped lang="scss">
	@import '../../styles/_variables.scss';
	.main-grid {
		display: inline-grid;
		grid-template-columns: 1fr 1px 1fr auto;
	}

	.input-grid {
		display: inline-grid;
		grid-template-columns: auto 1fr;
	}

	.suggestions-list {
		max-height: $autocomplete-max-height;
	}
</style>
