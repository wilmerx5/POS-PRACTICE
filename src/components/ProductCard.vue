<script setup>

import { useCartStore } from '@/stores/cart';
import { formatMoney } from '@/utilities';

const cartStore = useCartStore()
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>
<template>

    <div class="rounded bg-white shadow relative">
        <img :src="product.image" :alt="product.id">

        <div class="p-3 space-y-2">

            <h3 class="text-xl font-black text-gray-500"> {{ product.name }}</h3>

            <p class="text-gray-500"> stock: {{ product.availability }}</p>

            <p class="text-gray-900"> {{ formatMoney(product.availability) }}</p>


        </div>

        <button
        type="button"
        class="absolute top-5 right-3"

        @click="cartStore.addItem(product)"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 rounded-full text-purple-500 bg-red">
                <path fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                    clip-rule="evenodd" />
            </svg>

        </button>
    </div>
</template>