<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    to: {
        type: String,
        required: true
    }
})
</script>

<template>
    <RouterLink :to="{ name: to }" class="rounded bg-green-600 hover:bg-green-600  py-1 px-10">
        <slot></slot>
    </RouterLink>
</template>