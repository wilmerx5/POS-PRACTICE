<script setup>
import { formatMoney } from '@/utilities';
import Amount from './Amount.vue';
const props = defineProps({
    sale: {
        type: Object,
        required: true
    }
})
</script>
<template>

    <div class=" border-t border-gray-200 space-y-6 py-6">
        <h2 class="text-2xl font-black"> Details:</h2>
        <p class="text-2xl font-black text-gray-500"> Details:</p>
        <ul role="list" class="mt-6 divide-y divide-gray-2 border-gray-200 text-sm font-medium text-gray-500">
            <li v-for="item in sale.items" class="flex space-x-6 py-6">
                <img :src="item.image"
                :alt="item.id"
                class="h-24 w-24 flex-none rounded-lg"
                >
                <div flex="auto space-y-2">
                    <h3 class="text-gray-900"> {{ item.name }}</h3>
                    <h3 class="text-gray-900"> {{ formatMoney(item.price) }}</h3>
                    <h3 class="text-gray-900"> {{ item.quantity}}</h3>


                </div>

                <dl class="space-y-6 border-t pt-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label> subtotal:</template>
                {{ formatMoney(sale.subtotal) }}
            </Amount>

            <Amount>
                <template #label> Taxes:</template>
                {{ formatMoney(sale.taxes) }}
            </Amount>
            <Amount v-if="sale.discount" class="bg-green-400 p-2">
                <template #label> Discount:</template>
                {{ formatMoney(sale.discount) }}
            </Amount>
            <Amount>
                <template #label> Total:</template>
                {{ formatMoney(sale.total) }}
            </Amount>
        </dl>
            </li>
        </ul>

    </div>
</template>