<script setup>
import {useRouter} from "vue-router";

import authentication from "../composable/useAuth";

const {isAuthenticated, logout} = authentication();

const router = useRouter();

const loggingOut = () => {
    logout();
    router.push("/");
};
</script>

<template>
<div class="text-blue-200 bg-blue-800">
    <div class= "container flex items-center justify-between mx-auto">
        <h1 class="text-3xl font-thin tracking-tighter">
            bug<span class="font-normal">Track</span>
        </h1>
        <nav>
            <ul class="flex space-x-4">
                 <router-link to="/">
                    <li class="px-4 py-8 hovver:cursor-pointer hover:bg-blue-500 hover:text-blue-800">Home</li>
                    </router-link>
                    
                <div v-if="!isAuthenticated" class="flex">
                   
                    <router-link :to="{name:'About'}">
                    <li class="px-4 py-8 hovver:cursor-pointer hover:bg-blue-500 hover:text-blue-800">About</li>
                    </router-link>
                    <router-link 
                    :to="{path: '/login'}">
                    <li class="px-4 py-8 hovver:cursor-pointer hover:bg-blue-500 hover:text-blue-800">Login</li>
                    </router-link>
                </div>
                <div v-else class="flex">
                    <router-link :to="{path: '/applications'}">
                    <li class="px-4 py-8 hovver:cursor-pointer hover:bg-blue-500 hover:text-blue-800">Applications</li>
                    </router-link>
                     <router-link :to="{path: '/bugs'}">
                    <li class="px-4 py-8 hovver:cursor-pointer hover:bg-blue-500 hover:text-blue-800">Bugs</li>
                    </router-link>
                     <router-link :to="{path: '/solutions'}">
                    <li class="px-4 py-8 hovver:cursor-pointer hover:bg-blue-500 hover:text-blue-800">Solutions</li>
                    </router-link>
                    <button @click="loggingOut">
                        <li class="px-4 py-8 hovver:cursor-pointer hover:bg-blue-500 hover:text-blue-800">Logout</li>
                    </button>
                </div>
               
                
            </ul>
        </nav>
    </div>
</div>
    
</template>