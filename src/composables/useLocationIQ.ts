import { createFetch } from '@vueuse/core'

const REGION: string = import.meta.env.VITE_LOCATIONIQ_REGION;
const BASE_URL: string = `https://${REGION}.locationiq.com/v1/`;
const API_KEY: string = import.meta.env.VITE_LOCATIONIQ_ACCESS_TOKEN;
const FORMAT: string = 'json';

export const useLocationIQ = createFetch({
    baseUrl: BASE_URL,
    options : {
        beforeFetch(ctx) {
            const q: URLSearchParams = new URLSearchParams();
            q.append('key', API_KEY);
            q.append('format', FORMAT);
            ctx.url += '&' + q.toString();
            return ctx;
        },

        afterFetch(ctx) {
			if (typeof ctx.data === 'string') ctx.data = JSON.parse(ctx.data);
			return ctx;
		},
    }
})