
import { query } from "firebase/database";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc, where } from "firebase/firestore";
import { deleteObject, ref as storageRef } from 'firebase/storage';
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCollection, useFirebaseStorage, useFirestore } from "vuefire";


export const useProductsStore = defineStore('products', () => {
    const router = useRouter()
    const storage = useFirebaseStorage()
    const db = useFirestore()

    const selectedCategory = ref(2)
    const categories = [
        { id: 1, name: 'Hoddies' },
        { id: 2, name: 'Tenis' },
        { id: 3, name: 'glasses' },

    ]

    const q = query(
        collection(db, 'products'),
        where('price', '>', 1)
    )
    const productsCollection = useCollection(q)

    const categoryOptions = computed(() => {

        const options = [
            { label: 'SELECT', value: '', attrs: { disabled: true } },
            ...categories.map(cat => ({
                label: cat.name, value: cat.id
            }))
        ]

        return options
    })
    async function createProduct(product) {

        await addDoc(collection(db, 'products'), product)
        router.push({ name: 'admin-products' })

    }

    async function updateProduct(docRef, product) {

        const { image, url, ...values } = product

        if (image.length) {
            await updateDoc(docRef, { ...values, image: url.value })

        } else {

            await updateDoc(docRef, values)
        }

    }

    async function deleteProduct(id) {
        try {
            if (confirm('Delete?')) {

                const docRef = doc(db, 'products', id)
                const docSnap = await getDoc(docRef)
                const { image } = docSnap.data()

                console.log(docSnap)

                const imageRef = storageRef(storage, image)

                await Promise.all([
                    deleteDoc(docRef),
                    deleteObject(imageRef)
                ])
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const noResults = computed(() => {
        return productsCollection.value.length === 0
    })

    const filteredProducts = computed(()=>{
        return productsCollection.value
        .filter(pr=>pr.category==selectedCategory.value)
        .filter(pr=>pr.availability>0)
    })
    return {
        createProduct,
        updateProduct,
        deleteProduct,
        categoryOptions,
        productsCollection,
        noResults,
        filteredProducts,
        categories,
        selectedCategory

    }
})