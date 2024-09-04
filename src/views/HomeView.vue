<script setup>

import Cart from '@/components/Cart.vue';
import MainNav from '@/components/MainNav.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';

const productsStore = useProductsStore()

const { filteredProducts, noResults } = storeToRefs(productsStore)
</script>
<template>
    <MainNav></MainNav>

    <main class="pt-10 lg:flex lg:h-screen lg:overflow-hidden">
        <div class="lg:w-2/3 lg:screen lg:overflow-scroll pt-10 pb-32 px-10">

            <p v-if="noResults" class="text-center text-4xl"> There is No Results</p>
            <div v-else class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
            <ProductCard v-for="product in filteredProducts"
            :product="product"
            :key="product.id"
            >

            </ProductCard>
            </div>
        </div>
        <aside class="lg:w-2/3 lg:screen lg:overflow-scroll pt-10 pb-32 px-10">
<Cart></Cart>
        </aside>
    </main>
</template>