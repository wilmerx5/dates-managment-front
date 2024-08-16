<script setup>
import appointmentApi from '@/services/appointmentApi';
import { useAppointmentStore } from '@/stores/appointments';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()


const {id} = route.params

const appointmentStore = useAppointmentStore()

onMounted(async()=>{

    try{
        const {data}=await appointmentApi.getById(id)

        appointmentStore.setSelectedAppointment(data)
    }
    catch(e){
       router.push({name:'my-appointments'})
    }
})


</script>
<template>
    <nav class="my-5 flex gap-3">
            <RouterLink
            :to="{name:'edit-appointments'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
           :class="route.name=='edit-appointments'? 'bg-blue-600 text-white':'bg-white text-blue-500' "
            >
            Services
            </RouterLink>
            <RouterLink
            :to="{name:'editDetails-appointments'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
            :class="route.name=='editDetails-appointments'? 'bg-blue-600 text-white':'bg-white text-blue-500' "
            >
           APPOINTMENT
            </RouterLink>
    </nav>
    <RouterView>

    </RouterView>
</template>