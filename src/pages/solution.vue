<script setup>
import { useRoute , useRouter} from "vue-router";
import {useForm, useField} from "vee-validate";
import * as yup from "yup";
import UndrawProblemSolving from "vue-undraw/UndrawProblemSolving.vue";


import { useSolution } from "../composable/useSolution";
import { useBug } from "../composable/useBug";

const {solutions, searchSolution, addSolution, updateSolution, getSolution} = useSolution();
const {bugs} = useBug();


const route = useRoute();
const router = useRouter();

const {id : solutionID} = route.params;



const solutionSchema = yup.object({
    solDescription: yup.string().required().label("Solution Description"),
    solvedDate: yup.date().required().label("Solved Date"),
    solvedBy: yup.string().required().label("Solved By"),
    bug: yup.string().required().label("Bug"),
});

useForm({
    validationSchema: solutionSchema
});

const {value: solDescription, errorMessage: solDescriptionError} = useField("solDescription");
const {value: solvedDate, errorMessage: solvedDateError} = useField("solvedDate");
const {value: solvedBy, errorMessage: solvedByError} = useField("solvedByError");
const {value: bug, errorMessage: bugError} = useField("bug");




if(solutionID){

    
    const solution = getSolution(solutionID);

    if(solution){
        solDescription.value = solution.description;
        solvedDate.value = solution.solvedDate.substring(0,10);;
        solvedBy.value = solution.solvedBy;
        bug.value = solution.bugID;

              
    }
}


const saveSolution = () => {
    const solution = { description: solDescription.value, solvedDate: solvedDate.value, solvedBy: solvedBy.value, bugID: bug.value};
    
  
    if(solutionID){
        updateSolution(solutionID, solution);
    }else{
        addSolution(solution);
    }

    router.push("/solutions");
};

const cancel = () => {
    router.push("/solutions");
}

</script>

<template>
<div class="flex flex-col items-center justify-center space-y-12 min-h-screen-nonav">
    
    <div class="flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg shadow-2xl">
        <UndrawProblemSolving class="h-64" />
        <form @submit.prevent="saveSolution" class="flex flex-col p-4 space-y-4">
             <label for="bug">Bug</label>
             <select name="bug" id="bug" class="p-2 border-2 rounded-lg" 
                 v-model="bug"  >
                <option v-for="bug in bugs" :key="bug.id" 
                :value="bug.id">{{bug.name}}</option>
               
            </select>
            
            <textarea name="solDescription" class="p-2 border-2 rounded-lg" rows="4"
                placeholder="Solution Description" v-model="solDescription">
            </textarea>
            <span class="text-xs text-center text-red-500">{{solDescriptionError}}</span>

            <label for="solvedDate">Solved Date</label>
            <input type="date" name="solvedDate" id="solvedDate" v-model="solvedDate" />
            <span class="text-xs text-center text-red-500">{{solvedDateError}}</span>
    
                  
            <input type="text"  name="solvedBy" class="p-2 border-2 rounded-lg" 
                placeholder="Solved By" v-model="solvedBy" />
            <span class="text-xs text-center text-red-500">{{solvedByError}}</span>

            <div class="flex space-x-2">
                <button @submit.prevent="saveSolution" type="submit" class="w-1/2 py-2 text-blue-200 bg-blue-600 rounded-lg">
                    Save
                </button>
                <button @click="cancel" class="w-1/2 py-2 text-gray-200 bg-gray-600 rounded-lg">
                    Cancel
                </button>
            </div>
    </form>
    </div>
    
</div>

    
</template>