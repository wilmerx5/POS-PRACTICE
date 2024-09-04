<script setup>
import { useCouponStore } from '@/stores/coupons';


const couponStore = useCouponStore()
</script>

<template>
<div v-if="!couponStore.isCouponUsed">
    <p class="mt-5 py-5 font-bold border-t boder-gray-200 ">¿Do you have a coupon?</p>

    <div class="flex">
        <input type="text" v-model="couponStore.couponInput" placeholder="Set the coupon"
            class="p-2 bg-white border border-gray-300 w-full">
        <button type="button" class="p-3 bg-green-400 font-bold" :disabled="couponStore.isCouponUsed"
            @click="couponStore.applyCoupon()">
            Check
        </button>

    </div>

    <p class="py-2 text-center text-sm font-extrabold">
        {{ couponStore.validation_message }}
    </p>
</div>
</template>