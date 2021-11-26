<script setup>
import {ref} from "@vue/reactivity";

import { useSolution } from "../composable/useSolution";

const {solutions, searchSolution} = useSolution();

const searchItem = ref("");
</script>

<template>
   
<div>
    <input type="text" 
    v-model="searchItem"
    @change="searchSolution(searchItem)"
    placeholder="Search a solution"
    class="w-full py-4 mt-16 text-xl text-center rounded-full"/>
    <div class="pt-16">
        <ul class="grid grid-cols-3 gap-12">
        <router-link class="p-4 bg-white rounded-lg shadow-2xl cursor-pointer hover:scale-105"
        v-for="solution in solutions" :key="solution.id"
        :to="`/solution/${solution.id}`">
            <div>
                <h3 class="text-sm italic">
                    {{solution.description}}
                </h3>
               
                <p class="mr-2 font-semibold text-right">
                    [{{solution.solvedBy}}]
                </p>
                
            </div>
        </router-link>
    </ul>
    
    <router-link to="/solution/">
        <button class="p-4 mt-16 ml-2 font-bold text-center text-white bg-blue-400 rounded hover:bg-blue-800">
        Add new solution
        </button>
    </router-link>
        
    
    </div>
    
</div>
 
    
</template>