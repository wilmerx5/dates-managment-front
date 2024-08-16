<script setup>
import AuthApi from '@/services/AuthApi';
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()

const token = route.params.token
const toast = inject('toast')

const validToken = ref(false)
onMounted(async () => {
    try {

        const { data } = await AuthApi.verifyPasswordResetToken(token)
        toast.open({
            message: data.msg,
            type: 'success'
        })
        validToken.value = true
    }
    catch (e) {
        toast.open({
            message: e.response.data.msg,
            type: 'error'
        })
    }
})

const handleSubmit = async (formdata) => {
    try {

        const { data } = await AuthApi.updatePassword(token,formdata)
        toast.open({
            message: data.msg,
            type: 'success'
        })

        router.push({name:'log-in'})
    }
    catch (e) {
        toast.open({
            message: e.response.data.msg,
            type: 'error'
        })
    }
}
</script>

<template>

    <div v-if="validToken">
        <FormKit id="resetForm" @submit="handleSubmit" type="form" :actions="false"
            incomplete-message="Check the fields">


            <FormKit type="password" label="Password" name="password" placeholder="Your Password"
                validation="required |length:8" :validation-messages="{
                    required: 'Please writet least 8 characters',
                    length: 'write at least 8 characters'
                }"></FormKit>

            <FormKit type="password" label="confirm-password" name="password_confirm" placeholder="confirm Password"
                validation="required |confirm" :validation-messages="{
                    required: 'Please repeat your password',
                    confirm: 'password doesnt match'
                }"></FormKit>

            <FormKit type="submit">
                Reset
            </FormKit>

        </FormKit>
    </div>

    <p v-else class="text-center text-2xl text-white"> Invalid token</p>
</template>