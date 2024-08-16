
import appointmentApi from "@/services/appointmentApi";
import { convertToDDMMYYYY, convertToISO } from "@/utils/date";
import { defineStore } from "pinia";
import { computed, inject, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";



export const useAppointmentStore = defineStore('appointments', () => {
    const userStore = useUserStore()
    const toast = inject('toast')

    const router = useRouter()
    const appointId = ref('')
    const appointmentServices = ref([])

    const appointmentsByDate = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref([])
    onMounted(() => {
        const startHour = 10
        const endHour = 19
        for (let hour = startHour; hour < endHour; hour++) {

            hours.value.push(hour + ':00')
        }
    })


    watch(date, async () => {
        time.value = ''
        if (date.value == '') return



        const { data } = await appointmentApi.getByDate(date.value)


        if (appointId.value) {

            appointmentsByDate.value = data.filter(e => e._id != appointId.value)

            time.value = data.filter(e => e._id == appointId.value)[0].time

        } else {
            appointmentsByDate.value = data
        }
    })
    function onServiceSelected(service) {

        if (appointmentServices.value.some(ser => ser._id == service._id)) {
            appointmentServices.value = appointmentServices.value.filter(ser => ser._id != service._id)

        } else {

            if (appointmentServices.value.length >= 2) {
                alert('You can only select two services per appointment')
                return
            }

            appointmentServices.value.push(service)
        }
    }
    const isServiceSelected = computed(() => {

        return (id) => appointmentServices.value.some(service => service._id === id)
    })
    const noServicesSelected = computed(() => appointmentServices.value.length == 0)
    const totalAmount = computed(() => appointmentServices.value.reduce((total, va) => total + va.price, 0))

    const isValidReservation = computed(() => {

        return appointmentServices.value.length && date.value.length && time.value.length
    })

    async function saveAppointment() {
        const appointment = {
            services: appointmentServices.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }
        if (appointId.value) {
            try {

                const { data } = await appointmentApi.update(appointId.value, appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })

            } catch (e) {
                toast.open({
                    message: e.response.data.msg,
                    type: 'error'
                })
            }
        } else {
            try {

                const { data } = await appointmentApi.create(appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
              
            } catch (e) {
                toast.open({
                    message: e.response.data.msg,
                    type: 'error'
                })
            }
           
        }
       cleanAppointmentsData()
        router.push({ name: 'my-appointments' })
        userStore.getUserAppointments()

    }

    function cleanAppointmentsData(){
        appointId.value =''
        appointmentServices.value = []
        date.value = ''
        time.value = ''
        totalAmount.value = 0
    }
    function setSelectedAppointment(appointment) {
        appointmentServices.value = appointment.services
        date.value = convertToDDMMYYYY(appointment.date)
        time.value = appointment.value
        appointId.value = appointment._id
    }
    const isDateSelected = computed(() => {
        return date.value ? true : false
    })

    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find(appoint => appoint.time == hour)
        }
    })

    async function cancelAppointment(id){
        
        try{
           const {data}= await appointmentApi.delete(id)
           toast.open({
            message:data.msg,
            type:'success'
           })

           userStore.getUserAppointments()
        }catch(e){
            toast.open({
                message:e.response.data.msg,
                type:'error'
               })
        }
    }
    return {
        appointmentServices,
        onServiceSelected,
        saveAppointment,
        cleanAppointmentsData,
        setSelectedAppointment,
        isServiceSelected,
        hours,
        totalAmount,
        noServicesSelected,
        date,
        time,
        isValidReservation,
        isDateSelected,
        disableTime,
        cancelAppointment
    }
})