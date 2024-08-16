import appointmentApi from "@/services/appointmentApi";
import AuthApi from "@/services/AuthApi";
import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const user = ref({})
    const username = ref('')
    const userAppointments=ref([])

    const loading = ref(false)


    async function getUserAppointments() {
        const { data } = await appointmentApi.getUserAppointments(user.value._id)
       userAppointments.value = data
    }
    function logout() {
        localStorage.removeItem('AUTHTOKEN')
        user.value = {}
        router.push({ name: 'log-in' })
    }
  watch(user,()=>{
    username.value = user.value.name
  })

  onMounted(async () => {
    loading.value = true
    try {
        const { data } = await AuthApi.auth()
        user.value = data

        await getUserAppointments()
    }
    catch (e) {
        console.log(e)
    }finally{
        loading.value=false
    }
})

    const noAppointments = computed(()=>{
        return userAppointments.value.length==0
    })
    return {
        user,
        logout,
        getUserAppointments,
        userAppointments,
        noAppointments,
        loading,
        username

    }
})