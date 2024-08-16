<script setup>

const authRoutes =[
    {name:'Sign-in', txt:'Sign In'},
    {name:'log-in', txt:'Log In'},
    {name:'reset-password', txt:'Forget Password'},


]
</script>

<template>

    <div class="mx-auto lg:w-4/5 mt-20">


        <nav class="mt-10 flex flex-col  items-center space-y-5 lg:flex-row lg:justify-between ls:space-y-0">
       
                <RouterLink
                v-for="authRoute in authRoutes"
                class="uppercase font-bold text-white"
                :to="{name:authRoute.name}"
                >
                {{ authRoute.txt }} 
                </RouterLink>
        </nav>
        <RouterView/>
        
    </div>
</template>