<script setup>
import Link from '@/components/Link.vue';
import SalesDetails from '@/components/SalesDetails.vue';
import { useSalesStore } from '@/stores/sales';
import { formatMoney } from '@/utilities';
import VueTailwindDatePicker from 'vue-tailwind-datepicker';

const salesStore = useSalesStore()
</script>

<template>
  <div>
    <Link to="admin-products">
    Back
    </Link>
    <h1 class="text-4xl font-black my-5">Sales</h1>

    <div class="md:flex  ">

      <div class="md:w-1/2 lg:w-1/3 bg-white flex ">
        <VueTailwindDatePicker i18n="es-mx" as-single="true" no-input="true" class="p-5" v-model="salesStore.date"
          :formatter="{ date: 'DD/MM/YYYY', month: 'MMMM' }" />
      </div>

      <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
        <p class="font-black text-center" v-if="salesStore.isDateSelected">Sales of Day {{ salesStore.date }}</p>
        <p class="font-black text-center" v-else="salesStore.isDateSelected">Select a date</p>
        <div></div>
        <div v-if="salesStore.salesCollection.length>0"  class="space-y-5">
          <p class="tex-black font-bold">Total Sales: {{ formatMoney((salesStore.totalSales)) }}</p>
          <SalesDetails
          v-for="sale in salesStore.salesCollection"
          :key="sale.id"
          :sale="sale"
          ></SalesDetails>
        </div>
        <p v-else-if="salesStore.noSales" class="text-center font-extrabold text-3xl">There are no sales</p>
      </div>
    </div>
  </div>
</template>