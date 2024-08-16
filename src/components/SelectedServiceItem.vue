<script setup>
import { formatMoney } from '@/utils/index'
import { useAppointmentStore } from '@/stores/appointments.js'

defineProps({
    service: {
        type: Object
    }
})

const appointmentsStore = useAppointmentStore()


</script>
<template>
    <div class=" border border-gray-600 rounded-lg p-5 flex justify-between items-center">

        <p class="text-2xl font-extrabold text-white">{{ service.name }}</p>
        <p class="text-3xl font-black text-blue-500">{{ formatMoney(service.price) }}</p>

        <button @click="appointmentsStore.onServiceSelected(service)" type="button"
            class="inline-flex  items-center rounded-md bg-red-600 text-white p-2 mx-1 hover:bg-red-700">
            Delete
        </button>
      
    </div>

 
</template>