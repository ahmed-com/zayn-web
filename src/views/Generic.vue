<script lang="ts">
export default {
    name: "Generic"
} 
</script>

<template>
    <data-table
        class="ma-6 w-75"
        v-model:items-per-page="itemsPerPage"
        v-model:current-page="currentPage"
        v-model:search-term="searchTerm"
        v-model:sort-by="sortBy"
        v-model:filter-by="filterBy"
        :actions="actions"
        :page-data="data ? data : []"
        :is-loading="isFetching"
        :data-length="data ? data.total : 0"
        :import-template-headers="headers"
        title="Users"
        :loading-error="error"
        :headers="headers"
        :isImporting="isImporting"
        @import="importData"
        @refresh="refresh"
        @view="view"
        @showActions="showActions"
        @action="handleAction"
        @hover="hover"
    >
        <template #create-btn="props">
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-btn class="d-inline bg-primary mx-2" icon="mdi-table-plus"  v-bind="props"></v-btn>
            </template>
            <span>Create</span>
          </v-tooltip>
        </template>
    </data-table>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import DataTable from '../components/data-table/DataTable.vue';
import { Desert } from '../types/Desert.type';
import { SortBy } from '../types/SortBy.type';
import { TableHeader, TableRow, TableRowAction, TableRowState } from '../types/TableData.type';
import { useUsers } from '../composables/useUser';
import { FilterBy } from '../types/FilterBy.type';
import { MapMarker } from '../types/MapMarker.type';
import { GeoPoint } from '../types/GeoPoint.type';
import { useSearchMapStore } from '../stores/searchMapStore';

const itemsPerPage = ref(5);
const currentPage = ref(1);
const searchTerm = ref('');
const isImporting = ref(false);
const sortBy = ref<SortBy[]>([]);
const filterBy = ref<FilterBy[]>([]);
const actions = ref<TableRowAction[]>([]);

const view = (row: TableRow) => console.log(row.id + ' View');
const showActions = (row: TableRow) => {
  console.log(row.id + ' Show Actions');
  actions.value = [
    {
      icon: 'mdi-pencil',
      text: 'Edit',
      color: 'primary',
      key: 'edit',
    },
    {
      icon: 'mdi-delete',
      text: 'Delete',
      color: 'error',
      key: 'delete',
    },
  ]
}
const handleAction = (event: {row: TableRow, action: TableRowAction}) => {
  console.log(event.row.id + ' ' + event.action.key);
}

const { data, error, isFetching, execute } = useUsers(
  searchTerm,
  itemsPerPage,
  computed(() => (currentPage.value - 1) * itemsPerPage.value),
  sortBy,
  filterBy,
  { immediate: true, refetch: true}
);

const refresh = () => execute();

const importData = (data: Desert[]) => {
  isImporting.value = true;
  setTimeout(() => {
    isImporting.value = false;
  }, 2000);
  console.log(data);
}
const headers: TableHeader[] = [
  {
    text: 'Name',
    key: 'name',
    sortable: true,
    filterable: true,
    type: 'markableText',
  },

  {
    text: 'User Name',
    key: 'username',
    sortable: true,
    filterable: true,
    type: 'markableText',
  },

  {
    text: 'Email',
    key: 'email',
    sortable: false,
    filterable: true,
    type: 'markableText',
  },

  {
    text: 'Phone',
    key: 'phone',
    sortable: false,
    filterable: true,
    type: 'markableText',
  },

  {
    text: 'Address',
    key: 'address',
    sortable: false,
    filterable: false,
    type: 'entity',
    value: 'street',
  },

  {
    text: 'Website',
    key: 'website',
    sortable: false,
    filterable: false,
    type: 'text',
  },

  {
    text: 'Company',
    key: 'company',
    sortable: false,
    filterable: false,
    type: 'entity',
    value: 'name',
  },

]

const { setMarkers, setView } = useSearchMapStore();
watchEffect(()=>{
  setView({
    lat: 31,
    lng: 31
  });

  setMarkers(data.value ? data.value.map(user=>({
    description: user.username,
    position: {
      lat: parseFloat(user.address.geo.lat),
      lng: parseFloat(user.address.geo.lng)
    },
    isHighlighted: false,
  })) : [])
})

const hover = (row: TableRow | null)=>{
  setMarkers(data.value ? data.value.map(user=>({
    description: user.username,
    position: {
      lat: parseFloat(user.address.geo.lat),
      lng: parseFloat(user.address.geo.lng)
    },
    isHighlighted: row ? row.id === user.id : false,
  })) : [])
  }


</script>

<style scoped>
</style>