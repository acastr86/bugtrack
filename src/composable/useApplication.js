
import {ref} from "vue";
import axios from "axios";

let temp = [];
const applications = ref([]);

const api = axios.create({
    baseURL: import.meta.env.VITE_BUG_TRACK_API_BASE_URL
});

export const useApplication = () => {

    const getApplications = async () => {
        const response = await api.get(`applications?username=${import.meta.env.VITE_BUG_TRACK_API_USER}&password=${import.meta.env.VITE_BUG_TRACK_API_PASS}`);

        if(response.status === 200){
            temp = response.data;

            applications.value = [...temp];
        }
    };

    const searchApplication = (appName) => {
        const regex = new RegExp(appName, 'i');
        applications.value = temp.filter(x => regex.test(x.name));
    };

    const updateApplication = (id, app) =>{
        const index = temp.findIndex(x => x.id === id);
        temp[index] = {id, ... app};
        const updatedApp = temp[index];

        applications.value = [...temp];
        
        return {updatedApp};

    };

    const addApplication = (app) =>{
        const newApp = {...app};
        temp.push(newApp);
        applications.value = [...temp];
        return {newApp};

    };

    const getApplication = (id) =>{

        return applications.value.find(x => x.id == id);
    };

    getApplications();

    return {applications, searchApplication, addApplication, updateApplication, getApplication};
}