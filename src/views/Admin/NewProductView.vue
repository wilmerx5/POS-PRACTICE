<script setup>

import Link from '@/components/Link.vue';
import useImage from '@/composables/useImage';
import { useProductsStore } from '@/stores/products';
import { reactive } from 'vue';

const {onFIleChange,isImageUploaded,url}=useImage()
const productsStore = useProductsStore()

const formData = reactive({
    name:'',
    category:'',
    price:'',
    availability:'',
    image:''

})

const submitHandler=async (data)=>{
    const {image,...values}=data
    try{
        await productsStore.createProduct({...values,image:url.value})
    }
    catch(e){
        console.log(e)
    }
}
</script>

<template>
    <div>

        <Link to="admin-products">
        Back
        </Link>
        <h1 class="text-4xl font-black">New Product</h1>


        <div class="flex justify-center bg-white shadow-sm">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">
                <FormKit type="form"
                @submit="submitHandler"
                incomplete-message="Revisa los campos"
                :actions="false">

                <FormKit type="text" label="name"  name="name" placeholder="Name Product"
                validation="required"
                :validation-messages="{required:'THe field is required'}"

                v-model.trim="formData.name"
                />
                <FormKit type="file" label="image"  name="image" 
                validation="required"
                :validation-messages="{required:'Image is required'}"
                accept=".jpg"
                multiple="true"
                v-model.trim="formData.image"

                @change="onFIleChange"
                />
                <div v-if=" isImageUploaded">
                    <p class="font-black"> Image:</p>
                    
                    <img
                    class="w-32 rounded"
                    :src="url"
                    >

                </div>

                <FormKit type="select" label="category"  name="category" 
                validation="required"
                :validation-messages="{required:'Category is required'}"
                :options="productsStore.categoryOptions"

                v-model.number="formData.category"

                
                />

                <FormKit type="number" label="price"  name="price" 
                placeholder="price"
                validation="required"
                min="1"
                :validation-messages="{required:'price is required'}"
                v-model.number="formData.price"

                
                />

                <FormKit type="number" label="availability"  name="availability" placeholder="availability"
                validation="required"
                min="1"
                :validation-messages="{required:'Amount is required'}"
                v-model.number="formData.availability"
                
                />

                <FormKit type="submit" label="submit"  name="submit" placeholder="submit"
            
                />

            </FormKit>
            </div>
           
        </div>

    </div>
</template>