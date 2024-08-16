import ServiceAPI from "@/services/ServiceAPI";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
export const useServiceStore = defineStore('services', () => {
    const services = ref([])
    onMounted(async() => {


        try{
            const {data:{data}} = await ServiceAPI.all()
           
            services.value = data

        }
        catch(e){
            console.log(e)
        }
        
    })

    return {
        services


    }
})