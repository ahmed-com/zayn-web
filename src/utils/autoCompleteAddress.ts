import { UseFetchOptions } from "@vueuse/core";
import { computed, Ref } from "vue";
import { useLocationIQ } from "../composables/useLocationIQ";
import { useDebouncedRefHistory } from '@vueuse/core';
import { Address } from "../types/Address.type";

type Response = Array<{
	lat: string,
	lon: string,
	display_name: string
}>

export const autoCompleteAddress = ( address: Ref<string | Address>, useFetchOptions: UseFetchOptions ) => {
	const computedAddress = computed<string>(()=> {
		if( typeof address.value === 'string') return address.value;
		return address.value.description;
	})
	const {last} = useDebouncedRefHistory(computedAddress,{capacity: 1, debounce: 300})
	const url = computed<string>(()=>`autocomplete?q=${last.value.snapshot}`)
	return useLocationIQ<Response>(url, useFetchOptions);
}