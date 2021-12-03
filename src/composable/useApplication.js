
import {ref} from "vue";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

let temp = [];
const applications = ref([]);

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BUG_TRACK_API_BASE_URL}/applications`,
    params: {
        username : import.meta.env.VITE_BUG_TRACK_API_USER,
        password : import.meta.env.VITE_BUG_TRACK_API_PASS
    } 
});

export const useApplication = () => {

    const getApplications = async () => {
        const response = await api.get("");

        if(response.status === StatusCodes.OK){
            temp = response.data;

            applications.value = [...temp];
        }
    };

    const searchApplication = (appName) => {
        const regex = new RegExp(appName, 'i');
        applications.value = temp.filter(x => regex.test(x.name));
    };

    const updateApplication = async (id, app) =>{
        const updatedApp = {...app};
        const response = await api.put(`/${id}`, updatedApp);

       
        if(response.status === StatusCodes.OK){
            await getApplications();
        }

        return {updatedApp};

    };

    const addApplication = async (app) =>{
        const newApp = {...app};
        const response = await api.post("", newApp);

       
        if(response.status === StatusCodes.CREATED){
            await getApplications();
        }

        return {newApp};

    };

    const getApplication =  (id) =>{

        return applications.value.find(x => x.id == id);
    };

    getApplications();

    return {applications, searchApplication, addApplication, updateApplication, getApplication};
}