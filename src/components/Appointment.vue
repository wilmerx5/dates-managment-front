<script setup>
import { useAppointmentStore } from '@/stores/appointments';
import { formatMoney } from '@/utils';
import { displayDate } from '@/utils/date';
defineProps({
    appointment: {
        type: Object,
        required: true
    }
})
const appointmentStore = useAppointmentStore()
</script>

<template>
    <div class="bg-white p-5 space-y-3 rounded-lg">
        <p class="text-gray-500 font-black">

            Date:<span class="font-light"> {{ displayDate(appointment.date) }} </span>
            Time:<span class="font-light"> {{ appointment.time }} hours.</span>
        </p>

        <p class="text-lg font-black">
            Services Selected on date:
        </p>
        <div v-for="service in appointment.services">
            <p>{{ service.name }}</p>
            <p class="text-2xl font-black text-blue-500">{{ formatMoney(service.price) }}</p>


        </div>
        <p class="text-2xl font-black text-right">

            Total: <span class="text-blue-600">{{ formatMoney(appointment.totalAmount) }}</span>
        </p>

        <div class="flex gap-2 items-center ">
            <RouterLink
            :to="{name:'edit-appointments',params:{id:appointment._id}}"
            class="bg-slate-600 rounded-lg p-3 text-white text-sm uppercase  font-black flex-1 md:flex-none"
            >
                    Edit
            </RouterLink>

            <button

            @click="appointmentStore.cancelAppointment(appointment._id)"
            class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase  font-black flex-1 md:flex-none"
            
            >
                Cancel
            </button>

        </div>
    </div>
</template>