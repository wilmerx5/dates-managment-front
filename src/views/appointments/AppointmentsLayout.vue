<script setup>

import { useServiceStore } from '@/stores/services.js';
import { useUserStore } from '@/stores/user';
const servicesStore = useServiceStore()
const userStore = useUserStore()
</script>
<template>
    <div class="flex justify-between">
        <h1 class="text-2xl lg:text-6xl font-black text-white ">DATES MANAGER</h1>

        <div class="flex flex-col space-y-5">
            <div class="flex gap-2 items-center">
                <p class="text-white text-right"> Hello: {{userStore.username}}</p>
                <button
                type="button"
                @click="userStore.logout()"
                class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs rounded-lg"
                >
                Sign out
                </button>
            </div>
            <nav class="flex gap-2 items-center justify-end">
                    <RouterLink
                    class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
                    :to="{name:'my-appointments'}" >

                    My appointments</RouterLink>
                    <RouterLink
                    class="p-4 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-700"
                    :to="{name:'create-appointments'}" >
                        New Appointment
                    </RouterLink>
            </nav>

        </div>

    </div>
    <main>
        <RouterView></RouterView>

    </main>
</template>