import { ref, watchEffect } from 'vue';
import { Address } from '../types/Address.type';
import { GeoPoint } from '../types/GeoPoint.type';
import { locationToAddress } from '../utils/locationToAddress';

export const useGeoAdddress = () => {
	const error = ref<'geolocation unavailable' | 'unknown' | null>(null);
	const isLoading = ref<boolean>(false);
	const geoAddress = ref<Address | null>(null);

	const handleNavigatorError = () => {
		error.value = 'unknown';
		isLoading.value = false;
		geoAddress.value = null;
	};

	const handleNavigatorSuccess = (position: GeolocationPosition) => {
		const geoPoint = ref<GeoPoint>({
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		});
		const { data, isFetching, error: geocodingError } = locationToAddress(geoPoint, {});

		watchEffect(()=>{
			if(data.value !== null) geoAddress.value = {
				description: data.value.display_name,
				point: geoPoint.value
			};
			isLoading.value = isFetching.value;
			error.value = geocodingError.value;
		})
	};

	const exec = () => {
		isLoading.value = true;

		if (!('geolocation' in navigator)) {
			error.value = 'geolocation unavailable';
			isLoading.value = false;
			geoAddress.value = null;
			return;
		}

		navigator.geolocation.getCurrentPosition(handleNavigatorSuccess, handleNavigatorError);
	};

	return { isLoading, geoAddress, error, exec };
};
