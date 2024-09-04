<script setup>
import { useCartStore } from '@/stores/cart';
import { useCouponStore } from '@/stores/coupons';
import { formatMoney } from '@/utilities';
import Amount from './Amount.vue';
import CartItem from './CartItem.vue';
import CouponForm from './CouponForm.vue';


const cartStore = useCartStore()
const couponsStore = useCouponStore()
</script>

<template>
    <p v-if="cartStore.isEmptyCart" class="text-center text-3xl text-red-400">
            Empty Cart
    </p>

    <div v-else>

        <p class="text-4xl font-bold text-gray-900 text-center">Your purchase</p>

        <ul
        role="list"
        class="mt-6 divide-y divide-gray-200"
        >
            <CartItem v-for="item in cartStore.items" :key="item.id" :item="item">

            </CartItem>
        </ul>

        <dl class="space-y-6 border-t pt-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label> subtotal:</template>
                {{ formatMoney(cartStore.subtotal) }}
            </Amount>

            <Amount>
                <template #label> Taxes:</template>
                {{ formatMoney(cartStore.taxes) }}
            </Amount>
            <Amount v-if="couponsStore.isCouponUsed">
                <template #label> Discount:</template>
                {{ formatMoney(couponsStore.discount) }}
            </Amount>
            <Amount>
                <template #label> Total:</template>
                {{ formatMoney(cartStore.total) }}
            </Amount>
        </dl>

        <CouponForm></CouponForm>

        <button
        type="button  "
        class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
       @click="cartStore.checkOut"
        >
            PURCHASE
        </button>
    </div>
</template>