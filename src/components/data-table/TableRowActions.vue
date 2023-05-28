<script lang="ts">
export default {
  name: 'TableRowActions'
}
</script>

<template>
  <div ref="target" class="position-relative d-inline-block text-center">
    <div>
      <v-btn
        class="d-inline bg-transparent mx-2 elevation-0 z-index-1"
        icon="mdi-dots-vertical"
        @click.stop="toggleVisible"
      ></v-btn>
    </div>

    <Transition name="scroll-y">
      <div
        v-show="visible"
        class="position-absolute mt-2 elevation-4 bg-surface rounded-lg z-index-2"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        :class="{
          'position-left-0': isRtl,
          'position-right-0': !isRtl
        }"
      >
        <div class="py-1" role="none">
          <span v-if="!actions.length" class="pa-6 no-user-select text-info"> N/A </span>
          <v-btn
            v-for="action in actions"
            :key="action.key"
            class="w-100 elevation-0 text-start"
            @click.stop="handleAction(action)"
            >{{ action.text }} <v-icon :color="action.color">{{ action.icon }}</v-icon></v-btn
          >
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { defineProps, defineEmits, ref } from 'vue'
import { TableRowAction } from '../../types/TableData.type'
import { useRtl } from 'vuetify/lib/framework.mjs'

const { isRtl } = useRtl();

const target = ref<HTMLElement | null>()

onClickOutside(target, () => {
  visible.value = false
})

const props = defineProps<{
  actions: TableRowAction[]
}>()

const emit = defineEmits<{
  (event: 'action', value: TableRowAction): void
  (event: 'showActions'): void
}>()

const visible = ref(false)

const toggleVisible = () => {
  visible.value = !visible.value
  emit('showActions')
}

const handleAction = (action: TableRowAction) => {
  emit('action', action)
  visible.value = false
}
</script>

<style scoped>
  .scroll-y-enter-active,
  .scroll-y-leave-active {
    transition: all 0.3s;
  }
  .scroll-y-enter-from{
    transform: translateY(-10px);
    opacity: 0;
  }

  .scroll-y-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  .scroll-y-enter-to,
  .scroll-y-leave-from {
    transform: translateY(0);
    opacity: 1;
  }



</style>
