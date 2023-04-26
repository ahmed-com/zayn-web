import { computed, Ref } from "vue";
import { useDebouncedRefHistory } from "@vueuse/core";
import { SortBy } from "../types/SortBy.type";
import { FilterBy } from "../types/FilterBy.type";

export const useResourceUrl = (resource: string, searchTerm: Ref<string>, limit: Ref<number>, offset: Ref<number>, sortBy: Ref<SortBy[]>, filters: Ref<FilterBy[]>) => {
    const { last: lastTerm } = useDebouncedRefHistory(searchTerm, {
        capacity: 1,
        debounce: 300,
    });
    const { last: lastLimit } = useDebouncedRefHistory(limit, {
        capacity: 1,
        debounce: 1000,
    });
    const computedFilter = computed<Map<string,string>>(() => {
        const filterMap = new Map<string, string>();
        filters.value.forEach((filter) => {
            const value: string = filter.value as string;
            if (value === '') return;
            const key: string = filter.operator === 'eq' ? filter.field : filter.field + '_' + filter.operator;
            filterMap.set(key, value);
          });
        return filterMap;
    })

    const url = computed<string>(() => {
        const query = new URLSearchParams({
            q: lastTerm.value.snapshot,
            _limit: lastLimit.value.snapshot.toString(),
            _start: offset.value.toString(),
            _sort: sortBy.value.map((s) => s.field).join(","),
            _order: sortBy.value.map((s) => s.direction).join(","),
            ...Object.fromEntries(computedFilter.value),
        });
        return `${resource}?${query.toString()}`;
    });
    return url;
}