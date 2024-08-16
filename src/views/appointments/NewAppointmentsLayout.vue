<script setup>
import { useAppointmentStore } from '@/stores/appointments';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const appointmentsStore = useAppointmentStore()

onMounted(()=>{

    appointmentsStore.cleanAppointmentsData()
})

</script>
<template>
    <nav class="my-5 flex gap-3">
            <RouterLink
            :to="{name:'create-appointments'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
           :class="route.name=='create-appointments'? 'bg-blue-600 text-white':'bg-white text-blue-500' "
            >
            Services
            </RouterLink>
            <RouterLink
            :to="{name:'details-appointments'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
            :class="route.name=='details-appointments'? 'bg-blue-600 text-white':'bg-white text-blue-500' "
            >
           APPOINTMENT
            </RouterLink>
    </nav>
    <RouterView>

    </RouterView>
</template>