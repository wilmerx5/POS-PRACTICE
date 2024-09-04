
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useCartStore } from "./cart";

export const useCouponStore = defineStore('coupons', () => {

    const cartStore = useCartStore()

    const VALID_COUPONS=[
        {name:'10DESCUENTO',discount:.10},
        {name:'20DESCUENTO',discount:.20},
        {name:'30DESCUENTO',discount:.30},

    ]
    const validation_message= ref('')
    const discountToApply = ref(0)
    const discount = ref(0)

    const couponInput = ref('')

    watch(discountToApply,()=>{
        discount.value = (cartStore.total*discountToApply.value).toFixed(2)
    })
    function applyCoupon() {
        console.log('valdiating')
        if(VALID_COUPONS.some(coupon=>coupon.name==couponInput.value)){
          validation_message.value='APPLYING...'

          setTimeout(() => {
            
              const percent = VALID_COUPONS.find(el=>el.name===couponInput.value)
              discountToApply.value = percent.discount 
             validation_message.value='APPLIED'

          }, 3000);
        }else{
            
            validation_message.value='INVALID COUPON'
        }

        setTimeout(() => {
            validation_message.value=''
            
        }, 5000);
    }

    const isCouponUsed=computed(()=>{
        return discountToApply.value>0
    })
    return {

        couponInput,
        applyCoupon,
        validation_message,
        discountToApply,
        discount,
        isCouponUsed

    }
})