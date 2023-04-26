<script lang="ts">
export default {
    name: "OrderList"
}
</script>

<template>
    <div v-for="order in props.orders">
        <v-hover :key="order.id" v-model="order.isHighlighted" v-slot="{ props }">
            <v-alert v-bind="props" class="my-2 mx-8 w-50" type="info" :elevation="order.isHighlighted ? '6' : '2'">{{
                order.title }} </v-alert>
        </v-hover>
    </div>
</template>

<script setup lang="ts">
    import { Order } from '../types/Order.type';

    const props = defineProps<{orders: (Order & {isHighlighted: boolean})[]}>()
</script>