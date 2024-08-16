<script setup>
import AuthApi from '@/services/AuthApi';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const toast = inject('toast')
const handleSubmit = async (formData) => {
    try {
        const { data } = await AuthApi.login(formData)
       localStorage.setItem('AUTHTOKEN',data.token)
        toast.open({
            message:data.msg,
            type:'success'
        })
        router.push({name:'my-appointments'})
    }
    catch (e) {
        toast.open({
            message:e.response.data.error,
            type:'error'
        })
    }
}
</script>
<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Log in</h1>
    <p class="text-2xl text-white text-center my-10">If you have an account log in</p>

    <FormKit id="loginForm" @submit="handleSubmit" type="form" :actions="false" incomplete-message="Check the fields">


        <FormKit type="email" label="Email" name="email" placeholder="Your Email" validation="required | email"
            :validation-messages="{
                required: 'Please write your email',
                email: 'write a valid email'
            }"></FormKit>


        <FormKit type="password" label="Password" name="password" placeholder="Your Password" validation="required "
            :validation-messages="{
                required: 'Please write your password',
            }"></FormKit>

        <FormKit type="submit">
            Log In
        </FormKit>

    </FormKit>
</template>