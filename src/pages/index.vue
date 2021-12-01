<script setup>
import UndrawWelcome from "vue-undraw/UndrawWelcome.vue"
import authentication from "../composable/useAuth";
import authetication from "../composable/useAuth";
const {isAuthenticated ,user} = authentication();

</script>

<template>
<div class="flex flex-col items-center justify-center space-y-12 min-h-screen-nonav">
    <h2 v-if="!isAuthenticated" class="text-6xl tracking-tighter font-extralight">Welcome</h2>
     <h2 v-else class="text-6xl tracking-tighter font-extralight">
         Welcome <span v-if="user.displayName">{{ user?.displayName}}</span>
         <span v-else>{{user?.email}}</span></h2>
    <UndrawWelcome height='400px' />
</div>
    
</template>