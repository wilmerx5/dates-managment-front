<script setup>

import AuthApi from '@/services/AuthApi';
import { reset } from '@formkit/core';
import { inject } from 'vue';
const toast = inject('toast')
const handleSubmit = async ({ email }) => {

    try {
        const { data } = await AuthApi.resetPassword({ email })
        toast.open({
            message: data.msg,
            type: 'success'
        })
        reset('resetForm')
    }
    catch (e) {
        console.log(e)
        toast.open({
            message: e.response.data.msg,
            type: 'error'
        })
    }

}

</script>


<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Forgot password</h1>
    <p class="text-2xl text-white text-center my-10">REcover password</p>
    <FormKit id="resetForm" @submit="handleSubmit" type="form" :actions="false" incomplete-message="Check the fields">

        <FormKit type="email" label="Email" name="email" placeholder="Your Email" validation="required | email"
            :validation-messages="{
                required: 'Please write your email',
                email: 'write a valid email'
            }"></FormKit>

        <FormKit type="submit">
            Reset
        </FormKit>

    </FormKit>
</template>