import { Ref } from "vue";
import { useAPI } from "./useAPI";
import { SortBy } from "../types/SortBy.type";
import { useResourceUrl } from "./useResourceUrl";
import { UseFetchOptions } from "@vueuse/core";
import { User } from "../types/User.type";
import { FilterBy } from "../types/FilterBy.type";

type Response = Array<User> & { total: number };

export const useUsers = (searchTerm: Ref<string>, limit: Ref<number>, offset: Ref<number>, sortBy: Ref<SortBy[]>, filters: Ref<FilterBy[]>, useFetchOptions: UseFetchOptions) => {
    const url = useResourceUrl("users", searchTerm, limit, offset, sortBy, filters);
    return useAPI<Response>(url, useFetchOptions);
}