import {ref} from "vue";
import axios from "axios";

import { useApplication } from "./useApplication";

const {applications} = useApplication();

const api = axios.create({
    baseURL: import.meta.env.VITE_BUG_TRACK_API_BASE_URL,
    params: {
        username : import.meta.env.VITE_BUG_TRACK_API_USER,
        password : import.meta.env.VITE_BUG_TRACK_API_PASS
    } 
});

let temp = [];

const bugs = ref([]);

export const useBug = () => {

    const getBugs = async () => {
        const response = await api.get("bugs");

        if(response.status === 200){
            temp = response.data;

            bugs.value = [...temp];
           
        }
    };

  
    const searchBug = (bugName) => {
        const regex = new RegExp(bugName, 'i');
        bugs.value = temp.filter(x => regex.test(x.name));
    };

    const updateBug = (id, bug) =>{
        const index = temp.findIndex(x => x.id == id);
        temp[index] = {id, ... bug};
        const updatedBug = temp[index];

        bugs.value = [...temp];

        
        return {updatedBug};

    };

    const addBug = (bug) =>{
        const newBug = {...bug};
        temp.push(newBug);
        bugs.value = [...temp];
        return {newBug};

    };

    const getBug = (id) =>{

        return bugs.value.find(x => x.id == id);
    };


    getBugs();

    return {bugs, searchBug, addBug, updateBug, getBug};
}