<script setup>
import { useRoute , useRouter} from "vue-router";
import {useForm, useField} from "vee-validate";
import * as yup from "yup";
import UndrawBugFixing from "vue-undraw/UndrawBugFixing.vue";

import { useBug } from "../composable/useBug";
import { useApplication } from "../composable/useApplication";
import applicationVue from "./application.vue";

const {bugs, searchBug, addBug,updateBug, getBug} = useBug();
const {applications} = useApplication();


const route = useRoute();
const router = useRouter();

const {id : bugID} = route.params;



const bugSchema = yup.object({
    bugName: yup.string().min(10).required().label("Bug Name"),
    bugDescription: yup.string().required().label("Bug Description"),
    bugStatus: yup.string().required().label("Bug Status"),
    bugPriority: yup.number().positive().required().label("Bug Priority"),
    reportedDate: yup.date().required().label("Reported Date"),
    reportedBy: yup.string().required().label("Reported By"),
    application: yup.string().required().label("Application"),
});

useForm({
    validationSchema: bugSchema
});

const {value: bugName, errorMessage: bugNameError} = useField("bugName");
const {value: bugDescription, errorMessage: bugDescriptionError} = useField("bugDescription");
const {value: bugStatus, errorMessage: bugStatusError} = useField("bugStatus");
const {value: bugPriority, errorMessage: bugPriorityError} = useField("bugPriority");
const {value: reportedDate, errorMessage: reportedDateError} = useField("reportedDate");
const {value: reportedBy, errorMessage: reportedByError} = useField("reportedBy");
const {value: application, errorMessage: applicationError} = useField("application");




if(bugID){

    
    const bug = getBug(bugID);

    if(bug){
        
        bugName.value = bug.name;
        bugDescription.value = bug.description;
        bugStatus.value = bug.status;
        bugPriority.value = bug.priority;
        reportedDate.value = bug.reportedDate.substring(0,10);
        reportedBy.value = bug.reportedBy;
        application.value = bug.appID;  

       
        
        
    }
}


const saveBug = () => {
    const bug = {name: bugName.value, description: bugDescription.value, status: bugStatus.value, priority: bugPriority.value, reportedDate: reportedDate.value, reportedBy: reportedBy.value, appID: application.value};
    
    
  
    if(bugID){
        updateBug(bugID, bug);
    }else{
        addBug(bug);
    }

    router.push("/bugs");
};

const cancel = () => {
    router.push("/bugs");
}

</script>

<template>
<div class="flex flex-col items-center justify-center space-y-12 min-h-screen-nonav">
    
    <div class="flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg shadow-2xl">
        <UndrawBugFixing class="h-64" />
        <form @submit.prevent="saveBug" class="flex flex-col p-2 space-y-2">
             <label for="application">Application</label>
             <select name="application" id="application" class="p-2 border-2 rounded-lg" 
                 v-model="application"  >
                <option v-for="app in applications" :key="app.id" 
                :value="app.id">{{app.name}}</option>
               
            </select>
            
            <input type="text" name="bugName" class="p-2 border-2 rounded-lg" 
                placeholder="Bug Name" v-model="bugName"/>
            <span class="text-xs text-center text-red-500">{{bugNameError}}</span>
            
            <textarea name="bugDescription" class="p-2 border-2 rounded-lg" rows="4"
                placeholder="Bug Description" v-model="bugDescription">
            </textarea>
            <span class="text-xs text-center text-red-500">{{bugDescriptionError}}</span>

            <label for="bugStatus">Bug Status</label>
            <select name="bugStatus" id="bugStatus" class="p-2 border-2 rounded-lg" 
                 v-model="bugStatus" >
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
            </select>
            <span class="text-xs text-center text-red-500">{{bugStatusError}}</span>
           
            <label for="bugPriority">Bug Priority</label>
            <div>
                0
                <input type="range" step="1" min="0" max="10" 
                   name="bugPriority" id="bugPriority"  v-model="bugPriority" />
                10
            </div>
            
            <label for="reportedDate">Reported Date</label>
            <input type="date" name="reportedDate" id="reportedDate" v-model="reportedDate" />
            <span class="text-xs text-center text-red-500">{{reportedDateError}}</span>
    
                  
            <input type="text"  name="reportedBy" class="p-2 border-2 rounded-lg" 
                placeholder="Reported By" v-model="reportedBy" />
            <span class="text-xs text-center text-red-500">{{reportedByError}}</span>

            
             

            <div class="flex space-x-2">
                <button @submit.prevent="saveBug" type="submit" class="w-1/2 py-2 text-blue-200 bg-blue-600 rounded-lg">
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