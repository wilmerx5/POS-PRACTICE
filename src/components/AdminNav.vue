<script setup>
import Link from './Link.vue';
import Logo from './Logo.vue';
</script>
<template>
    <header class="px-10 py-5  bg-black flex justify-between top-0 w-full z-10">
     <Logo></Logo>
        <nav>

            <RouterLink 
            class="rounded text-white font-bold p-2"
            :to="{name:'admin-products'}"
            >
                Product
            </RouterLink>

            <RouterLink 
            class="rounded text-white font-bold p-2"
            :to="{name:'sales'}"
            >
           Sales
            </RouterLink>
            <Link to="home" > Store </Link>

        </nav>
    </header>
</template>
