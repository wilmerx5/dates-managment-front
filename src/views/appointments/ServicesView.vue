<script setup>
import ServiceItem from '@/components/ServiceItem.vue'
import {useServiceStore} from '@/stores/services.js'

const servicesStore = useServiceStore()
</script>
<template>

    <h2 class="text-4xl font-extrabold text-white mt-10">services</h2>

    <p class="text-white text-lg mt-5"> Choose a service for your appointment</p>

    <div class="grid grid-cols-2 gap-5 mt-5">
        <ServiceItem v-for="service in servicesStore.services" :key="service._id" :service="service">

        </ServiceItem>
    </div>
</template>