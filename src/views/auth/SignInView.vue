<script setup>
import AuthApi from '@/services/AuthApi';
import { reset } from '@formkit/vue';
import { inject } from 'vue';


const toast = inject('toast')
const handleSubmit=async({password_confirm,...formData})=>{

    try{

        const {data}= await AuthApi.signIn(formData)
        toast.open({
            message:data.msg,
            type:'success'
        })
        reset('registerForm')
    }
    catch(e){
        toast.open({
            message:e.response.data.msg,
            type:'error'
        })
    }

}
</script>
<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Create an account</h1>
    <p class="text-2xl text-white text-center my-10">Register in our app</p>

    <FormKit
    id="registerForm"
    @submit="handleSubmit"
    type="form"
    :actions="false"
    incomplete-message="Check the fields"
    >
    <FormKit type="text"
    label="Name"
    name="name"
    validation="required |length:3"
    :validation-messages="{
        required:'Please write your name',
        length:'Your name is to short'
    }"
    placeholder="Your Name"
    ></FormKit>

    <FormKit type="email"
    label="Email"
    name="email"
    placeholder="Your Email"

    validation="required | email"
    :validation-messages="{
        required:'Please write your email',
        email:'write a valid email'
    }"
    ></FormKit>


    <FormKit type="password"
    label="Password"
    name="password"
    placeholder="Your Password"

    validation="required |length:8"
    :validation-messages="{
        required:'Please writet least 8 characters',
        length:'write at least 8 characters'
    }"
    ></FormKit>

    <FormKit type="password"
    label="confirm-password"
    name="password_confirm"
    placeholder="confirm Password"

    validation="required |confirm"
    :validation-messages="{
        required:'Please repeat your password',
        confirm:'password doesnt match'
    }"
    ></FormKit>
    <FormKit type="submit"
    >
    Create account
    </FormKit>

    </FormKit>
</template>