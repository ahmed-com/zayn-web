<script lang="ts">
export default {
    name: "Stepper",
}
</script>

<template>
  <div class="rounded-lg elevation-4 bg-surface max-width-75-vw">

    <div v-if="steps.length > 1" class="bg-secondary rounded-t-lg pa-4 d-flex align-center">
      <template v-for="(step, i) in steps">
        <div class="d-flex flex-column align-center cursor-pointer no-user-select"
          :class="{ 'text-primary': i == activeStep}"
          @click="activeStep = i"
        >
          <div class="width-25 height-25">
            <v-icon size="30" v-if="isStepHasErrors(step) && activeStep > i" color="error" >mdi-alert-circle</v-icon>
            <v-icon size="30" v-else-if="isSuccessful || (!isStepHasErrors(step) && activeStep > i)" color="success">mdi-check</v-icon>
            <span v-else-if="i == activeStep" class="bg-primary rounded-circle text-h6 font-weight-bold d-flex justify-center align-center width-25 height-25">{{ i + 1 }}</span>
            <span v-else class="bg-surface rounded-circle text-h6 font-weight-bold d-flex justify-center align-center width-25 height-25">{{ i + 1 }}</span>
        </div>
          <div class="text-h6 font-weight-bold ml-2">{{ step.text }}</div>
        </div>
        <div v-if="i < steps.length - 1" class="flex-grow-1 d-flex justify-center">
          <v-divider color="primary" class="mx-2" ></v-divider>
        </div>
      </template>
    </div>

    <div class="rounded-b-lg min-height-75-vh overflow-x-hidden position-relative" :class="{'rounded-t-lg': steps.length === 1}">

      <div v-if="isSuccessful" class="d-flex flex-column justify-center align-center position-absolute position-center">
        <v-icon size="100" color="success">mdi-check-circle</v-icon>
        <div class="text-h5 font-weight-bold mt-4 no-pointer-events no-user-select">{{ successMessage }}</div>
        <v-btn class="mt-4" color="primary" :loading="loading" @click="emit('cancel')">{{ t('components.MultiStepForm.cancel') }}</v-btn>
        <v-btn class="mt-4" color="primary" @click="$router.push(redirectRoute)">{{ redirectText }}</v-btn>
      </div>
      
      <form v-else >
        <v-progress-linear v-if="loading" height="8" indeterminate color="primary"></v-progress-linear>
        <v-overlay v-model="loading" contained class="d-flex position-absolute w-100 justify-center align-center">
          <v-progress-circular indeterminate size="100" width="10" color="primary"></v-progress-circular>
        </v-overlay>
  
        <Transition :name="transitionName" mode="default">
              <FormFields class="pa-4" :key="steps[activeStep].key" :fields="steps[activeStep].fields.filter(isFieldResolved)" :errors="errors[steps[activeStep].key]?.filter(isErrorResolved(steps[activeStep]))" @updateField="updateField"></FormFields>
        </Transition>
  
        <div class="position-absolute position-bottom-0 d-flex pa-4 w-100">
          <v-btn v-if="activeStep > 0" class="mr-4" @click="activeStep--" text>{{ t('components.MultiStepForm.back') }}</v-btn>
          <div class="flex-grow-1 flex-shrink-1"></div>
          <v-btn v-if="activeStep < steps.length - 1" class="ml-4" @click="activeStep++" color="primary">{{ t('components.MultiStepForm.next') }}</v-btn>
          <v-btn 
            v-if="activeStep == steps.length - 1" 
            class="ml-4" color="primary" 
            @click="emit('submit')"
            :disabled="isSubmitDisabled"
            :loading="loading"
          >{{ t('components.MultiStepForm.submit') }}</v-btn>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRefs, computed } from 'vue'
import { useRtl } from 'vuetify/lib/framework.mjs';
import { InputField } from '../../types/InputField.type';
import FormFields from './FormFields.vue';
import { useI18n } from 'vue-i18n';
import { RouteLocationRaw } from 'vue-router';
import { assertCondition } from '../../utils/assertCondition';

type Props = {
  steps: Array<{
    key: string;
    text: string;
    fields: Array<InputField>;
  }>;
  activeStep: number;
  loading: boolean;
  errors: { [key: string]: string[] };
  isSuccessful: boolean;
  successMessage: string;
  redirectRoute: RouteLocationRaw;
  redirectText: string;
}

const props = defineProps<Props>();
const refProps = toRefs(props);

const emit = defineEmits<{
  (event: 'update:activeStep', value: number): void;
  (event: 'update:loading', value: boolean): void;
  (event: 'update:errors', value: { [key: string]: string[] }): void;
  (event: 'submit', value: void): void;
  (event: 'cancel', value: void): void;
  (event: 'updateField', value: { key: string; value: any }): void;
}>();

const activeStep = computed<number>({
  get: () => refProps.activeStep.value,
  set: (value: number) => emit('update:activeStep', value)
});

const loading = computed<boolean>({
  get: () => refProps.loading.value,
  set: (value: boolean) => emit('update:loading', value)
});

const errors = computed<{ [key: string]: string[] }>({
  get: () => refProps.errors.value,
  set: (value: { [key: string]: string[] }) => emit('update:errors', value)
});

const isFieldResolved = (field: InputField): boolean => {
  const allFields = props.steps.reduce((acc, step) => {
    return [...acc, ...step.fields];
  }, [] as InputField[]);

  return !field.dependsOn || field.dependsOn.every(({ key, operator, value }) => assertCondition(allFields.find(f => f.key == key)?.value, operator, value))
}

const isStepHasErrors = (step: { key: string; fields: InputField[] }) => {
  return step.fields.some(field => isFieldResolved(field) && (field.hasError || (field.required && !field.value)));
};

const isSubmitDisabled = computed<boolean>(()=> {
  return !props.steps.every(step => !isStepHasErrors(step));
});

const isErrorResolved = (step: {fields: InputField[]}) => (error: string) => {
  const getAllErrorsOfField = (field: InputField): string[] => [
    t('components.MultiStepForm.requiredField', { field: field.label }),
    ...Object.keys(field.rules || {}).map(rule => t('components.MultiStepForm.invalidValue', { field: field.label, rule }))
  ]

  return step
    .fields
    .filter(isFieldResolved)
    .some(field => getAllErrorsOfField(field).includes(error));
}

const { t } = useI18n();
const {isRtl} = useRtl();
const transitionName = ref<string>('');

const updateField = (update: {key: string, value: any}) => {
  emit('updateField', update);
  const { key, value } = update;
  const step = props.steps.find(step => step.fields.findIndex(field => field.key === key) > -1)!;
  const field = step.fields.find(field => field.key === key)!;
  field.value = value;
  field.hasError = false;

  if (!errors.value[step.key]) {
    errors.value[step.key] = [];
  }

  if (field.required) {
    if(!value){
      if (!errors.value[step.key].includes(t('components.MultiStepForm.requiredField', { field: field.label }))) {
        errors.value[step.key].push(t('components.MultiStepForm.requiredField', { field: field.label }));
      }
      field.hasError = true;
    } else {
      if (errors.value[step.key]) {
        errors.value[step.key] = errors.value[step.key].filter(x => x !== t('components.MultiStepForm.requiredField', { field: field.label }));
      }
    }
  }

  Object.keys(field.rules || {}).forEach(rule => {
    if (field.rules && !field.rules[rule](value)) {
      if (!errors.value[step.key].includes(t('components.MultiStepForm.invalidValue', {field: field.label, rule}))) {
        errors.value[step.key].push(t('components.MultiStepForm.invalidValue', {field: field.label, rule}));
      }
      field.hasError = true;
    } else {
      if (errors.value[step.key]) {
        errors.value[step.key] = errors.value[step.key].filter(x => x !== t('components.MultiStepForm.invalidValue', {field: field.label, rule}));
      }
    }
  }
  );
}

watch(activeStep, (to, from) => {
  const isLeft = isRtl.value ? to < from : to > from;
  transitionName.value = isLeft ? 'slide-left' : 'slide-right';
});

</script>

<style scoped >

</style>
