<script setup>
import {ref} from "@vue/reactivity";

import { useBug } from "../composable/useBug";

const {bugs, searchBug} = useBug();

const searchItem = ref("");
</script>

<template>
   
<div v-if="bugs">
    <input type="text" 
    v-model="searchItem"
    @change="searchBug(searchItem)"
    placeholder="Search a bug"
    class="w-full py-4 mt-16 text-xl text-center rounded-full"/>
    <div class="pt-16">
        <ul class="grid grid-cols-3 gap-12">
        <router-link class="p-4 bg-white rounded-lg shadow-2xl cursor-pointer hover:scale-105"
        v-for="bug in bugs" :key="bug.id"
        :to="`/bug/${bug.id}`">
            <div>
                <h3 class="text-xl font-semibold tracking-tight">
                    {{bug.name}}
                </h3>
                <p class="text-sm italic">
                    {{bug.description}}
                </p>
                <p class="mr-2 font-semibold text-right">
                    [{{bug.status}}]
                </p>
                
            </div>
        </router-link>
    </ul>
    
    <router-link to="/bug/">
        <button class="p-4 mt-16 ml-2 font-bold text-center text-white bg-red-400 rounded hover:bg-red-800">
        Add new bug
        </button>
    </router-link>
        
    
    </div>
    
</div>
<div v-else>
        Loading...
 </div>
 
    
</template>