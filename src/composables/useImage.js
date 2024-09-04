import { getDownloadURL, ref as storagerRef, uploadBytesResumable } from 'firebase/storage'
import { uid } from 'uid'
import { computed, ref } from 'vue'
import { useFirebaseStorage } from "vuefire"
export default function useImage(){

    const url = ref(null)
    const storage = useFirebaseStorage()
    const onFIleChange=e=>{
      const file=e.target.files[0]
      const filename = uid()+'.jpg'
      const sRef = storagerRef(storage,'/products/'+filename)

      const uploadTask = uploadBytesResumable(sRef,file)
      uploadTask.on('state_changed',
        ()=>{},
        (err)=>console.log(err),
        ()=>{

            getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL)=>{

                url.value =DownloadURL

            })
        }
      )
    }

    const  isImageUploaded = computed(()=>{

        return url.value 
    })

    return{
        onFIleChange,
        isImageUploaded,
        url
    }

}