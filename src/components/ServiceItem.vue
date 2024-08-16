<script setup>
import {formatMoney} from '@/utils/index'
import{ useAppointmentStore} from '@/stores/appointments.js'

defineProps({
    service:{
        type:Object
    }
})
const  appointmentsStore = useAppointmentStore()
</script>

<template>
    <div 
    @click="appointmentsStore.onServiceSelected(service)"
    :class="appointmentsStore.isServiceSelected(service._id) ? 'bg-blue-500 text-white' :'bg-white'"
    class="p-5  space-y-5  rounded-lg  cursor-pointer"> 
        <p class="text-2xl font-light"> {{ service.name }}</p>
        <p 
         :class="appointmentsStore.isServiceSelected(service._id) ? ' text-white' :'text-blue-700'"
        class="text-2xl font-bold "> {{ formatMoney(service.price) }}</p>

    </div>

</template>