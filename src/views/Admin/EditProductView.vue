<script setup>
      import Link from '@/components/Link.vue';
import useImage from '@/composables/useImage';
import { useProductsStore } from '@/stores/products';
import { doc } from 'firebase/firestore';
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';
      const {  onFIleChange,  url, isImageUploaded } = useImage()
      const storeProducts = useProductsStore()

      const route = useRoute()
      const router = useRouter()

const db = useFirestore()

const docRef = doc(db,'products',route.params.id)

const product =  useDocument(docRef)
      const formData = reactive({
          name: '',
          category: '',
          price: '',
          availability: '',
          image: ''
      })

watch(product,(product)=>{
    Object.assign(formData,product)
})

const submitHandler =async(data)=>{

  try{

    await storeProducts.updateProduct(docRef,{...data,url})
    router.push({name:'admin-products'})

    
  }
  catch(e){
console.log(e)
  }
}
</script>

<template>
    <div class="mt-10">
        <Link
            to="admin-products"
        >
            Volver
        </Link>
            <h1 class="text-4xl my-10 font-extrabold">Editar Producto</h1>

            <div class="flex justify-center bg-white shadow">
            <div class="mx-auto mt-10 p-10 w-full  2xl:w-2/4">
              
                <FormKit
                    type="form"
                    :value="formData"
                    submit-label="Guardar Cambios"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="submitHandler"
                    :actions="false"
                >
                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="name"
                        placeholder="Nombre de Producto"
                        validation="required"
                        v-model.trim="formData.name"
                        :validation-messages="{ required: 'El Nombre del Producto es Obligatorio' }"
                    />

                    <FormKit 
                        type="select"
                        label="Categoría"
                        name="category"
                        validation="required"
                        v-model.number="formData.category"
                        :validation-messages="{ required: 'La Categoría es Obligatoria' }"
                        :options="storeProducts.categoryOptions"
                    />

                    <FormKit
                        type="number"
                        label="Precio"
                        name="price"
                        placeholder="Precio de Producto"
                        step="1"
                        min="1"
                        v-model.number="formData.price"
                    />

                    <FormKit
                        type="number"
                        label="Disponibles"
                        name="availability"
                        placeholder="Productos Disponibles"
                        v-model.number="formData.availability"
                        step="1"
                        min="0"
                    />

                    <div v-if="isImageUploaded">
                        <p class="font-black">Imagen Nueva:</p>
                        <img    
                          :src="url"
                          alt="Nueva imagen Producto" 
                          class="w-52"
                        />  
                    </div>

                    <div v-else>
                        <p class="font-black">Imagen Actual:</p>
                        <img  
                          :src="formData.image"
                          :alt="'Imagen de' + formData.image" 
                          class="w-52"
                        />  
                    </div>
                    

                    <FormKit
                        type="file"
                        label="Cambiar Imagen"
                        name="image"
                        multiple="false"
                        accept=".jpg"
                        @change=" onFIleChange"
                    />


                    <FormKit
                        type="submit"
                    >Guardar Cambios</FormKit>

                </FormKit>
            </div>
        </div>
        </div>
</template>