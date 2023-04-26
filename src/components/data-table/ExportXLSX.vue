<script lang="ts">
export default {
    name: "ExportXLSX",
}
</script>

<template>
    <v-tooltip location="bottom">
        <template #activator="{ props }">
            <v-btn v-bind="props" :disabled="!pageTable || disabled || loading" :loading="loading" icon="mdi-download" class="d-inline mx-2" color="primary" @click="exportXLSX">
            </v-btn>
        </template>
        <span>{{ t('components.DataTable.export') }}</span>
    </v-tooltip>
</template>

<script setup lang="ts">
import XLSX from "xlsx";
import { useI18n } from "vue-i18n";
import { defineProps, ref } from "vue";

const { t } = useI18n();

const loading = ref(false);

const props = defineProps<{
    pageTable: HTMLElement | null,
    filename: string,
    disabled: boolean,
}>();

function exportXLSX(){
    loading.value = true;
    if (!props.pageTable) return;
    const wb = XLSX.utils.table_to_book(props.pageTable, { sheet: props.filename });
    XLSX.writeFile(wb, `${props.filename}.xlsx`);
    loading.value = false;
}
</script>