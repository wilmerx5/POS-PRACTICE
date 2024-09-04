import { query } from "firebase/database";
import { collection, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useCollection, useFirestore } from "vuefire";
export const useSalesStore = defineStore('sales', () => {
    const date = ref('')

    const db = useFirestore()

    const salesSource = computed(() => {
        if (date.value) {
            const q = query(
                collection(db, 'sales'),
                where('date','==',date.value)


            )
            return q
        }
        
    })

    const  salesCollection = useCollection(salesSource)

    const noSales =computed(()=>!salesCollection.value.length>0 && isDateSelected.value)

    const isDateSelected = computed(() => {
        return date.value
    })

    const totalSales =computed(()=>{
        return salesCollection.value? salesCollection.value.reduce((vc,va)=>vc+va.total,0):0
    })
    return {
        date,
        isDateSelected,
        salesCollection,
        noSales,
        totalSales
    }
})