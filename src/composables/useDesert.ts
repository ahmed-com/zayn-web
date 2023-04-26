import { UseFetchOptions } from "@vueuse/core";
import { Ref } from "vue";
import { useAPI } from "../composables/useAPI";
import { Desert } from "../types/Desert.type";
import { SortBy } from "../types/SortBy.type";
import { useResourceUrl } from "../composables/useResourceUrl";
import { FilterBy } from "../types/FilterBy.type";

type Response = Array<Desert> & { total: number };

export const useDeserts = (
    searchTerm: Ref<string>,
    limit: Ref<number>,
    offset: Ref<number>,
    sortBy: Ref<SortBy[]>,
    filters: Ref<FilterBy[]>,
    useFetchOptions: UseFetchOptions
) => {
    const url = useResourceUrl("deserts", searchTerm, limit, offset, sortBy, filters);
    return useAPI<Response>(url, useFetchOptions);
};
