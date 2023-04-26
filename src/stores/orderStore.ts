import { defineStore } from "pinia";
import { ref } from "vue";
import { Order } from "../types/Order.type";

export const useOrderStore = defineStore('orderStore', ()=>{
    const orders = ref<(Order & { isHighlighted: boolean})[]>([]);

    return {orders}
})