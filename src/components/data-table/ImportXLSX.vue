<script lang="ts">
export default {
  name: "ImportXLSX",
}
</script>

<template>
  <v-tooltip location="top">
    <template #activator="{ props: tooltipProps }">
      <v-dialog v-model="isDialogOpen">
        <template #activator="{ props: dialogProps }">
          <v-btn :loading="isImporting" v-bind="{ ...dialogProps, ...tooltipProps }" icon="mdi-upload" class="d-inline mx-2" color="primary"
            :disabled="disabled || isImporting">
          </v-btn>
        </template>
        <v-card class="">
          <v-card-title class="headline">{{ t('components.DataTable.importCardTitle') }}</v-card-title>
          <v-card-text>
            <div v-if="!isFileSelected" @dragenter.prevent="isDragOver = true" @dragleave.prevent="isDragOver = false"
              @dragover.prevent="isDragOver = true" @drop.prevent="handleDrop"
              class="d-flex flex-column align-center justify-center text-h5 text-primary-darken-1 rounded-lg pa-4"
              :class="{ 'active-dragover': isDragOver, 'inactive-dragover': !isDragOver }">
              <v-icon color="#ccc" size="300">mdi-file-excel-outline</v-icon>
              {{ t('components.DataTable.dragAndDrop') }}
            </div>
            <div v-else class="d-flex flex-column align-center justify-center text-h5 text-primary-darken-1 rounded-lg pa-4">
              <v-progress-circular v-if="isLoading" indeterminate color="primary" size="300" width="10"></v-progress-circular>
              <div class="d-flex flex-column align-center bg-texture pa-2 w-75 max-width-50-vw"  v-else-if="error !== null">
                <h1 class="text-h2 text-error">{{ error.message }}</h1>
                <h2 class="text-info no-pointer-events no-user-select text-h6">{{ t('components.DataTable.useTemplateSuggestion') }}</h2>
              </div>
              <v-icon v-else color="primary-darken-1" size="300">mdi-file-excel-outline</v-icon>
              {{ fileDescription }}
            </div>
            <v-divider class="mt-2"></v-divider>
            <label for="import-file"
              class="cursor-pointer d-flex align-center justify-center elevation-4 bg-primary text-h5 text-white rounded-lg pa-2 my-2"
              :class="{ 'elevation-0 bg-secondary cursor-not-allowed': isFileSelected }">
              <input type="file" accept=".xlsx" id="import-file" @change="handleFileChange"
                :disabled="disabled" class="d-none" />
              {{ t('components.DataTable.selectFile') }}
            </label>
            <a :download="wsName + '.xlsx'" :href="templateUrl"> {{ t('components.DataTable.downloadTemplate') }} </a>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary-darken-1" :disabled="isImporting" text @click="isDialogOpen = false">
              {{ t('components.DataTable.cancelImport') }}
            </v-btn>
            <v-btn color="primary-darken-1" :disabled="!isFileSelected || isLoading || error !== null" :loading="isImporting" text @click="importFile">
              {{ t('components.DataTable.import') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <span>{{ t('components.DataTable.import') }}</span>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { defineProps, ref, computed, watch, watchEffect } from 'vue';
import XLSX from 'xlsx';
import { TableHeader } from '../../types/TableData.type';
import { map, pipe } from 'ramda';
import { numberToByteSize } from '../../utils/numberToByteSize';
const { t } = useI18n();

const props = defineProps<{
  importTemplateHeaders: TableHeader[],
  disabled: boolean,
  isImporting: boolean
}>()

const emit = defineEmits<{
  (event: 'import', fileData: any[]): void
}>()

const isDialogOpen = ref(false);
const isFileSelected = ref(false);
const isDragOver = ref(false);
const isLoading = ref(false);
const error = ref<Error | null>(null);
const fileDescription = ref<string | null>(null);
const fileData = ref<any[] | null>(null);

const wsName = t('components.DataTable.importTemplateSheetName');

watch(isDialogOpen, (isOpen) => {
  if (!isOpen) {
    isFileSelected.value = false;
    isDragOver.value = false;
    isLoading.value = false;
    error.value = null;
    fileDescription.value = null;
    fileData.value = null;
  }
});

watchEffect(()=> {
  if (!props.isImporting) {
    isDialogOpen.value = false;
  }
})

const templateUrl = computed(() => {
  const wsData = [
    props.importTemplateHeaders.map((header: TableHeader) => header.text),
  ];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, wsName);
  const u8 = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  return URL.createObjectURL(new Blob([u8], { type: 'application/octet-stream' }));
})

const disabled = computed(() => {
  return props.disabled || isLoading.value || isFileSelected.value || isDragOver.value || error.value;
})

const handleDrop = (e: DragEvent) => {
  e.stopPropagation();

  isLoading.value = true;

  const file = e.dataTransfer?.files[0];
  if (file) {
    isFileSelected.value = true;
    isDragOver.value = false;
    fileDescription.value = `${file.name} (${numberToByteSize(file.size)})`
  } else {
    isFileSelected.value = false;
    isDragOver.value = true;
    return
  }

  convertFileToFileData(file);
}

const importFile = () => {
  if (fileData.value) {
    emit('import', fileData.value);
  }
};

const handleFileChange = (event: any) => {
  const file = event.target.files[0];

  isLoading.value = true;

  if (file) {
    isFileSelected.value = true;
    fileDescription.value = `${file.name} (${numberToByteSize(file.size)})`
  } else {
    isFileSelected.value = false;
    return
  }

  convertFileToFileData(file);
}

async function convertFileToFileData(file: File) {
  try {
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data: Array<Array<string>> = XLSX.utils.sheet_to_json(ws, { header: 1 });
    const fileHeaders = data[0];
    const rows = data.slice(1);
    const tableData = pipe(
      map((row: Array<string | number>) => {
        const obj: any = {};
        props.importTemplateHeaders.forEach((header: TableHeader)=>{
          const index = fileHeaders.indexOf(header.text);
          if (index !== -1) {
            obj[header.key] = row[index];
          }else{
            throw new Error(t('components.DataTable.errors.missingHeader', { header: header.text}));
          }
        })
        return obj;
      })
    )(rows);
    fileData.value = tableData;
  } catch (e: any) {
    error.value = e;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.active-dragover {
  border: 2px dashed rgb(var(--v-theme-primary));
}

.inactive-dragover {
  border: 2px dashed rgb(var(--v-theme-secondary-lighten-3));
}
</style>