import { defineStore } from "pinia";
import { ref } from "vue";
import { TableRow } from "../types/TableData.type";

export const useRightSidebarStore = defineStore("rightSidebarStore", () => {
  const toggleMap = ref<boolean>(true);
  const row = ref<TableRow>();

  const toggle = () => toggleMap.value = !toggleMap.value;

  const setRow = (r: TableRow) => {
    row.value = r;
    toggleMap.value = false;
  };

  return {
    toggleMap,
    toggle,
    row,
    setRow
  };
});
