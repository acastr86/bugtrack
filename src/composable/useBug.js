import {ref} from "vue";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

import { useApplication } from "./useApplication";

const {applications} = useApplication();

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BUG_TRACK_API_BASE_URL}/bugs`,
    params: {
        username : import.meta.env.VITE_BUG_TRACK_API_USER,
        password : import.meta.env.VITE_BUG_TRACK_API_PASS
    } 
});

let temp = [];

const bugs = ref([]);

export const useBug = () => {

    const getBugs = async () => {
        const response = await api.get("");

        if(response.status === StatusCodes.OK){
            temp = response.data;

            bugs.value = [...temp];
           
        }
    };

  
    const searchBug = (bugName) => {
        const regex = new RegExp(bugName, 'i');
        bugs.value = temp.filter(x => regex.test(x.name));
    };

    const updateBug = async (id, bug) =>{
        const updatedBug = {...bug};
        const response = await api.put(`/${id}`, updatedBug);

       
        if(response.status === StatusCodes.OK){
            await getBugs();
        }

        return {updatedBug};

    };

    const addBug = async (bug) =>{
        const newBug = {...bug};
        const response = await api.post("", newBug);

       
        if(response.status === StatusCodes.CREATED){
            await getBugs();
        }

        return {newBug};

    };

    const getBug = (id) =>{

        return bugs.value.find(x => x.id == id);
    };


    getBugs();

    return {bugs, searchBug, addBug, updateBug, getBug};
}