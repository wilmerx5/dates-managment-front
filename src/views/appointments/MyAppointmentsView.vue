<script setup>
import Appointment from '@/components/Appointment.vue';
import { useUserStore } from '@/stores/user';


const userStore = useUserStore()



</script>

<template>
 <h1 class="text-6xl font-extrabold text-white text-center mt-10">My appointments 
 </h1>

 <p class="text-white text-2xl text-center mt-5" v-if="userStore.loading"> Loading</p>
 <div v-else>

     <p v-if="userStore.noAppointments" class="text-white text-2xl text-center mt-5">There are no dates soon</p>
     <div v-else class="grid grid-cols-1 gap-5 mt-10">
        <Appointment v-for="appointment in userStore.userAppointments" :key="appointment._id" :appointment="appointment">

        </Appointment>
     </div>
 </div>
</template>