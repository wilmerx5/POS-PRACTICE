<script setup>
import { useProductsStore } from '@/stores/products';
import Link from './Link.vue';
import Logo from './Logo.vue';

const productsStore = useProductsStore()
</script>
<template>
    <header class="px-10 py-5  bg-black flex justify-between top-0 w-full z-10">
        <div>
            <Logo>
            </Logo>
            <div class="flex flex-col lg:flex-row gap-5 text-white">
                <h2 class="text-lg font-extrabold">Filter:</h2>

                <div class="flex items-center gap-2" v-for="category in productsStore.categories" :key="category.id">

                    <input
                    @change="productsStore.selectedCategory= +$event.target.value"
                    :checked="productsStore.selectedCategory===category.id"
                    type="radio"
                    name="category"
                    :value="category.id"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    >

                    <label class="text-gray-100"> {{ category.name  }}</label>
                </div>
            </div>
        </div>

        <nav>
            <Link to="admin-products"> Admin </Link>


        </nav>
    </header>
</template>
