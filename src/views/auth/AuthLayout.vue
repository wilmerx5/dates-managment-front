<script setup>

const authRoutes =[
    {name:'Sign-in', txt:'Sign In'},
    {name:'log-in', txt:'Log In'},
    {name:'reset-password', txt:'Forget Password'},


]
</script>

<template>

    <div class="mx-auto lg:w-4/5 mt-20">


        <nav class="flex flex-col align-between md:justify-between md:flex-row  space-y-2 md:space-y-0  text-center">
       
                <RouterLink
                v-for="authRoute in authRoutes"
                class="uppercase font-bold text-white m-0"
                :to="{name:authRoute.name}"
                >
                {{ authRoute.txt }} 
                </RouterLink>
        </nav>
        <RouterView/>
        <h3>wotks</h3>
        
    </div>
</template>