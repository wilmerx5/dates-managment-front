<script setup>
import SelectedServiceItem from '@/components/SelectedServiceItem.vue'
import { useAppointmentStore } from '@/stores/appointments.js'
import { formatMoney } from '@/utils/index'
import { ref } from 'vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const appointmentsStore = useAppointmentStore()


const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM'
})
const disableDate=(date)=>{
  const today = new Date()

  return date< today || date.getMonth()> today.getMonth()+1 ||[0,6].includes(date.getDay())

}
</script>

<template>




  <p class="text-center text-white text-2xl" v-if="appointmentsStore.noServicesSelected">THere are no services selected
  </p>
  <div v-else class="grid gap-5 mt-5">
    <h2 class="text-4xl font-extrabold text-white mt-10">Details Appointment</h2>
    <p class="text-white text-lg mt-5"> Confirm your appointment</p>
    <SelectedServiceItem v-for=" service in appointmentsStore.appointmentServices" :key="service._id"
      :service="service">

    </SelectedServiceItem>
    <p class="text-white text-right text-2xl">

      Total: <span class="font-black"> {{ formatMoney(appointmentsStore.totalAmount) }}</span>
    </p>
  </div>
  <div class="space-y-8" v-if="!appointmentsStore.noServicesSelected">
    <h3 class="text-3xl font-extrabold text-white">Date</h3>

    <div v-if="appointmentsStore.isValidReservation" class="flex justify-end">

      <button 
      @click="appointmentsStore.saveAppointment()"
      class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white ">
        Confirm Appointment
      </button>
    </div>
    <div class="lg:flex gap-5 items-start">


      <div class="w-full lg:w-96 bg-white  flex justify-center rounded-lg">
        <VueTailwindDatepicker
        :disable-date="disableDate"
        i18n="es-MX" as-single no-input :formatter="formatter" v-model="appointmentsStore.date">

        </VueTailwindDatepicker>
      </div>
      <div v-if="appointmentsStore.isDateSelected" class=" mt-5 flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">

        <button
        class="blockrounded-lg text-xl font-black p-3 disabled:opacity-10" v-for="hour in appointmentsStore.hours"
        :disabled="appointmentsStore.disableTime(hour)?true:false"
          :class="appointmentsStore.time === hour ? 'bg-blue-500 text-white' : ' bg-white  text-blue-500 '"
          @click="appointmentsStore.time = hour">
          {{ hour }}
        </button>
      </div>

    </div>

  </div>
</template>