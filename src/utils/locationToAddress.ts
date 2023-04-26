import { UseFetchOptions } from "@vueuse/core";
import { computed, Ref } from "vue";
import { useLocationIQ } from "../composables/useLocationIQ";
import { GeoPoint } from "../types/GeoPoint.type";

type Response = {
    display_name: string
}

export const locationToAddress = ( p: Ref<GeoPoint>, useFetchOptions: UseFetchOptions ) => {
	const url = computed<string>(()=>`reverse?lat=${p.value.lat}&lon=${p.value.lng}`)
	return useLocationIQ<Response>(url, useFetchOptions);
}