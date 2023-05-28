<script lang="ts">
export default {
    name: "GenericChart"
} 
</script>

<template>
    <data-chart
      class="ma-6 w-75"
      v-model:items-per-page="itemsPerPage"
      v-model:current-page="currentPage"
      v-model:search-term="searchTerm"
      v-model:sort-by="sortBy"
      v-model:filter-by="filterBy"
      :page-data="data ? data : []"
      :is-loading="isFetching"
      :data-length="data ? data.total : 0"
      title="Deserts"
      row-title="name"
      :loading-error="error"
      :headers="headers"
      @refresh="refresh"
      @view="view"
    ></data-chart>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import DataChart from '../components/data-table/DataChart.vue'
import { SortBy } from '../types/SortBy.type';
import { TableHeader, TableRow } from '../types/TableData.type';
import { useDeserts } from '../composables/useDesert';
import { FilterBy } from '../types/FilterBy.type';

const itemsPerPage = ref(5);
const currentPage = ref(1);
const searchTerm = ref('');
const sortBy = ref<SortBy[]>([]);
const filterBy = ref<FilterBy[]>([]);

const view = (row: TableRow) => console.log(row.id + ' View');

const { data, error, isFetching, execute } = useDeserts(
  searchTerm,
  itemsPerPage,
  computed(() => (currentPage.value - 1) * itemsPerPage.value),
  sortBy,
  filterBy,
  { immediate: true, refetch: true}
);

const refresh = () => execute();

const headers: TableHeader[] = [
  {
    text: 'Name',
    key: 'name',
    sortable: true,
    filterable: true,
    type: 'markableText',
  },

  {
    text: 'Calories',
    key: 'calories',
    sortable: true,
    filterable: true,
    type: 'number',
  },

  {
    text: 'Fat',
    key: 'fat',
    sortable: true,
    filterable: true,
    type: 'number',
  },
  
  {
    text: 'Carbs',
    key: 'carbs',
    sortable: true,
    filterable: true,
    type: 'number',
  },

  {
    text: 'Protein',
    key: 'protein',
    sortable: true,
    filterable: true,
    type: 'number',
  },

  {
    text: 'Iron',
    key: 'iron',
    sortable: false,
    filterable: false,
    type: 'text',
  }
]

</script>

<style scoped>
</style>