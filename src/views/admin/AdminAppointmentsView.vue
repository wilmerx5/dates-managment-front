<script setup>
import { useUserStore } from '@/stores/user';

import AdminAppointments from '@/components/AdminAppointments.vue';
const userStore = useUserStore()
</script>

<template>

    <h2 class=" text-white text-lg mt-5">Appointments soon</h2>

    <p v-if=" userStore.loading" class="text-white  text-2xl text center  mt-5">

    </p>
    <div v-else>
        <p v-if="userStore.noAppointments" class=" text-white text-lg mt-5">
                There are no dates soon
        </p>
        <div v-else class="grid grid-cols1 gap-5 mt-10">
            <AdminAppointments
            v-for="appointment in userStore.userAppointments"
            :key="appointment._id"
            :appointment="appointment"
            ></AdminAppointments>
        </div>

    </div>
</template>