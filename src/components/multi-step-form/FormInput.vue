<script lang="ts">
export default {
  name: "FormInput",
}
</script>

<template>
  <input v-bind="$attrs" v-if="field.type === 'text'" type="text" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'email'" type="email" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'number'" type="number" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'password'" type="password" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'tel'" type="tel" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'url'" type="url" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'date'" type="date" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'time'" type="time" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'datetime-local'" type="datetime-local" :placeholder="field.placeholder"
    :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'week'" type="week" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'month'" type="month" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'color'" type="color" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'checkbox'" type="checkbox" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'radio'" type="radio" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'file'" type="file" :placeholder="field.placeholder" :value="field.value"
    @input="e => emit('updateField', { key: field.key, value: (e.target! as HTMLInputElement).value })" />
  <input v-bind="$attrs" v-if="field.type === 'image'" type="image" :placeholder="field.placeholder" :value="field.value"
    @input="e=> emit('updateField', {key: field.key, value: (e.target! as HTMLInputElement).value})" />
<input v-bind="$attrs" v-if="field.type === 'hidden'" type="hidden" :placeholder="field.placeholder" :value="field.value"
  @input="e=> emit('updateField', {key: field.key, value: (e.target! as HTMLInputElement).value})" />
<input v-bind="$attrs" v-if="field.type === 'search'" type="search" :placeholder="field.placeholder" :value="field.value"
  @input="e=> emit('updateField', {key: field.key, value: (e.target! as HTMLInputElement).value})" />
<input v-bind="$attrs" v-if="field.type === 'range'" type="range" :placeholder="field.placeholder" :value="field.value" 
  @input="e=> emit('updateField', {key: field.key, value: (e.target! as HTMLInputElement).value})" /> 
</template>

<script setup lang="ts">
import { InputField } from '../../types/InputField.type';

const props = defineProps<{ field: InputField }>();

const emit = defineEmits<{
  (event: 'updateField', update: { key: string; value: any }): void
}>()

</script>
