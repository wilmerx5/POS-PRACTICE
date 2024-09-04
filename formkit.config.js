import { generateClasses } from "@formkit/themes"

const config = {
    config: {
        classes: generateClasses({
            global:{

                label:'block mb-1 font-bold text-lg',
                message: 'text-red-500',
                wrapper:'space-y-2',
                input: 'w-full p-3 border border-gray-300 rounded text-gray-700'

            },
            file: {
                noFiles:'block my-2',
                fileItem:'hidden'
            },
            select: {
            },

            submit:{
                input:'$reset mt-2 bg-green-400 hover:bg-green-500 w-full p-2 font-bold uppercase text-white'
            }
        })
    }
}

export default config