<script setup>
import {ref} from "@vue/reactivity";

import { useApplication } from "../composable/useApplication";

const {applications, searchApplication} = useApplication();

const searchApp = ref("");
</script>

<template>
   
<div>
    <input type="text" 
    v-model="searchApp"
    @change="searchApplication(searchApp)"
    placeholder="Search an application"
    class="w-full py-4 mt-16 text-xl text-center rounded-full"/>
    <div class="pt-16">
        <ul class="grid grid-cols-3 gap-12">
        <router-link class="p-4 bg-white rounded-lg shadow-2xl cursor-pointer hover:scale-105"
        v-for="app in applications" :key="app.id"
        :to="`/application/${app.id}`">
            <div>
                <h3 class="text-xl font-semibold tracking-tight">
                    {{app.name}}
                </h3>
                <p class="text-sm italic">
                    {{app.description}}
                </p>
                <p class="mr-2 font-semibold text-right">
                    [{{app.type}}]
                </p>
                
            </div>
        </router-link>
    </ul>
    
    <router-link to="/application/">
        <button class="p-4 mt-16 ml-2 font-bold text-center text-white bg-green-400 rounded hover:bg-green-800">
        Add new application
        </button>
    </router-link>
        
    
    </div>
    
</div>
 
    
</template>