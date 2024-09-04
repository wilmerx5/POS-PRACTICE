import { getCurrentDate } from '@/utilities';
import { addDoc, collection, doc, runTransaction } from 'firebase/firestore';
import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";
import { useFirestore } from 'vuefire';
import { useCouponStore } from "./coupons";


export const useCartStore = defineStore('cart', () => {

    const db = useFirestore()
    const couponStore = useCouponStore()
    const items = ref([])
    const subtotal = ref(0)
    const TAX_RATE = .05
    const taxes = ref(0)
    const total = ref(0)


    function addItem(item) {
        const index = items.value.findIndex(it => it.id == item.id)

        if (index >= 0) {
            if (isProductAvailable(item, index)) {
                return
            }
            items.value[index].quantity++
        } else {

            items.value.push({ ...item, quantity: 1, id: item.id })
        }
    }
    const isProductAvailable = (item, index) => {
        return items.value[index].quantity >= item.availability || items.value[index].quantity >= 5
    }

    watchEffect(() => {
        subtotal.value = items.value.reduce((vc, va) => vc + (va.availability * va.quantity), 0)
        taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))
        total.value = Number(((subtotal.value + taxes.value) - couponStore.discount).toFixed(2))
    })

    const isEmptyCart = computed(() => {
        return items.value.length === 0
    })

    const checkProductAvailability = computed(() => {
        return (product) => product.availability < 5 ? product.availability : 5
    })

    function updateQuantity(id, quantity) {

        items.value = items.value.map(i => i.id === id ? { ...i, quantity } : i)
    }

    function deleteItem(id) {

        items.value = items.value.filter(el => el.id !== id)
    }

    async function checkOut() {
        try {
            await addDoc(collection(db, 'sales'), {
                items:items.value,
                subtotal: subtotal.value,
                taxes: taxes.value,
                total: total.value,
                date: getCurrentDate(),
                discount: couponStore.discount
            })

            items.value.forEach(async (item)=>{
                const  productRef = doc(db,'products',item.id)
                await runTransaction(db, async(transaction) => {
                    
                    const currentProduct = await transaction.get(productRef)
                    console.log(currentProduct)

                        const availability = currentProduct.data().availability-item.quantity

                        transaction.update(productRef,{availability})
                })

            })
                $reset()

                couponStore.$patch({
                    discountToApply:0,
                    couponInput:''
                })
            
        }
        catch (e) {
            console.log(e)
        }
    }

    function $reset(){
        items.value=[]
        subtotal.value= 0
        taxes.value= 0
        total.value= 0
    }
    return {
        addItem,
        updateQuantity,
        checkOut,
        taxes,
        items,
        isEmptyCart,
        checkProductAvailability,
        subtotal,
        total,
        deleteItem

    }
})