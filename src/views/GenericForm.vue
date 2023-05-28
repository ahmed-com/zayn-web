<script lang="ts">
export default {
  name: "GenericForm",
}
</script>

<template>
  <Stepper
  v-model:activeStep="activeStep"
  v-model:loading="loading"
  v-model:errors="errors"
  :steps="steps"
  :isSuccessful="isSuccessful"
  :successMessage="successMessage"
  :redirectRoute="redirectRoute"
  :redirectText="redirectText"
  @submit="submit"
  @cancel="cancel"
  @updateField="updateField"
  class="ma-6 w-75"></Stepper>
</template>

<script setup lang="ts">
import Stepper from '../components/multi-step-form/Stepper.vue';
import { ref } from 'vue';
import { InputField } from '../types/InputField.type';
import { RouteLocationRaw } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const activeStep = ref<number>(0);
const steps = ref<Array<{
  text: string,
  key: string,
  fields: InputField[]
}>>([
  {
    text: 'Step 1',
    key: 'step1',
    fields: [
      { key: 'name', value: '', label: 'Name', type: 'text', required: true, placeholder: 'Enter your name', helpText: 'Enter your full name', rules:{ 'rule': (x: string) => x.length > 0 }},
      { key: 'email', value: '', label: 'Email', type: 'email', required: true, placeholder: 'Enter your email', helpText: 'Enter your email address', rules:{ 'rule': (x: string) => x.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g) }},
      { key: 'phone', value: '', label: 'Phone', type: 'text', required: true, placeholder: 'Enter your phone', helpText: 'Enter your phone number', rules:{ 'rule': (x: string) => x.match(/^[0-9]{11}$/g) }},
    ]
  },
  {
    text: 'Step 2',
    key: 'step2',
    fields: [
      { key: 'address', value: '', label: 'Address', type: 'text', required: true, placeholder: 'Enter your address', helpText: 'Enter your address', rules:{ 'rule': (x: string) => x.length > 0 }},
      { key: 'state', value: '', label: 'State', type: 'text', required: true, placeholder: 'Enter your state', helpText: 'Enter your state', rules:{ 'rule': (x: string) => x.length > 0 }},
      { key: 'city', value: '', label: 'City', type: 'text', required: true, placeholder: 'Enter your city', helpText: 'Enter your city', rules:{ 'rule': (x: string) => x.length > 0 }, dependsOn: [{ key: 'state', value: 'Lagos', operator: 'eq'}]},
    ]
  },
  {
    text: 'Step 3',
    key: 'step3',
    fields: [
      { key: 'country', value: '', label: 'Country', type: 'text', required: true, placeholder: 'Enter your country', helpText: 'Enter your country', rules:{ 'rule': (x: string) => x.length > 0 }},
      { key: 'zip', value: '', label: 'Zip', type: 'text', required: true, placeholder: 'Enter your zip', helpText: 'Enter your zip', rules:{ 'rule': (x: string) => x.match(/^[0-9]{6}$/g) }},
    ]
  },
  {
    text: 'Step 4',
    key: 'step4',
    fields: [
      { key: 'salary', value: 0, label: 'Salary', type: 'number', required: true, placeholder: 'Enter your salary', helpText: 'Enter your salary', rules:{ 'rule': (x: number) => x > 0 }},
      { key: 'age', value: 0, label: 'Age', type: 'number', required: true, placeholder: 'Enter your age', helpText: 'Enter your age', rules:{ 'rule': (x: number) => x > 0 }},
    ]
  }
]);
const loading = ref<boolean>(false);
const isSuccessful = ref<boolean>(false);
const successMessage = ref<string>('');
const errors = ref<{ [key: string]: string[] }>({});
const redirectRoute = ref<RouteLocationRaw>({ name: 'Home' });
const redirectText = ref<string>('');

const submit = () => {
  console.log(steps.value.reduce((acc, curr) => {
    acc[curr.key] = curr.fields.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as { [key: string]: any });
    return acc;
  }, {} as { [key: string]: any }));
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    isSuccessful.value = true;
    successMessage.value = 'Form submitted successfully';
    redirectRoute.value = { name: 'Home' };
    redirectText.value = 'Go to Home';
  }, 2000);
}

const cancel = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    isSuccessful.value = true;
    successMessage.value = 'Form cancelled successfully';
  }, 2000);
}

const updateField = (update: {key: string, value: any}) => {
  console.log(update);
}

</script>