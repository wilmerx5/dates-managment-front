<script setup>

import AuthApi from '@/services/AuthApi';
import { inject, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

const {token} = route.params

const toast = inject('toast')



onMounted(async()=>{
    try{
    const {data} = await AuthApi.verifyAccount(token)
    toast.open({
        message:data.msg,
        type:'success'
    })

    setTimeout(() => {
        router.push({name:'log-in'})
    }, 3000);
    }
    catch(e){
        toast.open({
        message:e.response.data.msg,
        type:'error'
    })
    }
})
</script>
<template>
</template>