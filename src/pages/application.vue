<script setup>
import { useRoute , useRouter} from "vue-router";
import {useForm, useField} from "vee-validate";
import * as yup from "yup";
import UndrawAppInstallation from "vue-undraw/UndrawAppInstallation.vue";

import { useApplication } from "../composable/useApplication";

const {applications, searchApplication, addApplication,updateApplication, getApplication} = useApplication();


const route = useRoute();
const router = useRouter();

const {id : appID} = route.params;



const appSchema = yup.object({
    appName: yup.string().min(10).required().label("Application Name"),
    appDescription: yup.string().required().label("Application Description"),
    appUrl: yup.string().url().label("Application Web Page"),
    appType: yup.string().required().label("Application Type"),
});

useForm({
    validationSchema: appSchema
});

const {value: appName, errorMessage: appNameError} = useField("appName");
const {value: appDescription, errorMessage: appDescriptionError} = useField("appDescription");
const {value: appUrl, errorMessage: appUrlError} = useField("appUrl");
const {value: appType, errorMessage: appTypeError} = useField("appType");




if(appID){

    const application =  getApplication(appID);

      if(application){
        
    
        appName.value = application.name;
        appDescription.value = application.description;
        if(application.url){
            appUrl.value = application.url;
        }
        appType.value = application.type;
    }
}


const saveApplication = () => {
    const application = {name: appName.value, description: appDescription.value, url: appUrl.value, type: appType.value};
    
  
    if(appID){
        updateApplication(appID, application);
    }else{
        addApplication(application);
    }

    router.push("/applications");
};

const cancel = () => {
    router.push("/applications");
}

</script>

<template>
<div class="flex flex-col items-center justify-center space-y-12 min-h-screen-nonav">
    
    <div class="flex items-center justify-center overflow-hidden bg-blue-100 rounded-lg shadow-2xl">
        <UndrawAppInstallation class="h-64" />
        <form @submit.prevent="saveApplication" class="flex flex-col p-4 space-y-4">
            <input type="text" name="appName" class="p-2 border-2 rounded-lg" 
                placeholder="Application Name" v-model="appName"/>
            <span class="text-xs text-center text-red-500">{{appNameError}}</span>
            
            <textarea name="appDescription" class="p-2 border-2 rounded-lg" rows="4"
                placeholder="Application Description" v-model="appDescription">
            </textarea>
            <span class="text-xs text-center text-red-500">{{appDescriptionError}}</span>

            <input type="text" name="appUrl" class="p-2 border-2 rounded-lg" 
                placeholder="Application URL" v-model="appUrl" />
            <span class="text-xs text-center text-red-500">{{appUrlError}}</span>
            
            <input type="text"  name="appType" class="p-2 border-2 rounded-lg" 
                placeholder="Application Type" v-model="appType" list="appTypes"/>
            <span class="text-xs text-center text-red-500">{{appTypeError}}</span>

            <datalist id="appTypes">
                <option value="business"></option>
                <option value="erp"></option>
            </datalist>        

            <div class="flex space-x-2">
                <button @submit.prevent="saveApplication" type="submit" class="w-1/2 py-2 text-blue-200 bg-blue-600 rounded-lg">
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