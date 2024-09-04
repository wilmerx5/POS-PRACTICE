<script setup>
import Link from '@/components/Link.vue';
import Product from '@/components/Product.vue';
import { useProductsStore } from '@/stores/products';

const productsStore = useProductsStore()
</script>

<template>
    <div>
        <Link to="admin-products-new">
        ADD
        </Link>

        <p v-if="productsStore.noResults"></p>
        <ul
        v-else
        role="list" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
            <Product v-for="product in productsStore.productsCollection
            
            " :key="product.id"
             :product="product" />
            
    
        </ul>

    </div>


</template>