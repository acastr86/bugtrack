import {ref} from "vue";
import axios from "axios";

import { useBug } from "./useBug";

const {bugs} = useBug();

const api = axios.create({
    baseURL: import.meta.env.VITE_BUG_TRACK_API_BASE_URL,
    params: {
        username : import.meta.env.VITE_BUG_TRACK_API_USER,
        password : import.meta.env.VITE_BUG_TRACK_API_PASS
    } 
});


let temp = [];

const solutions = ref([]);

export const useSolution = () => {

    const getSolutions = async () => {
        const response = await api.get("solutions");

        if(response.status === 200){
            temp = response.data;

            solutions.value = [...temp];
        }
    };


    const searchSolution = (solutionName) => {
        const regex = new RegExp(solutionName, 'i');
        solutions.value = temp.filter(x => regex.test(x.description));
    };

    const updateSolution = (id, solution) =>{
        const index = temp.findIndex(x => x.id === id);
        temp[index] = {id, ... solution};
        const updatedSolution = temp[index];

        solutions.value = [...temp];
        
        return {updatedSolution};

    };

    const addSolution = (solution) =>{
        const newSolution = {...solution};
        temp.push(newSolution);
        solutions.value = [...temp];
        return {newSolution};

    };

    const getSolution = (id) =>{

        return solutions.value.find(x => x.id == id);
    };

    getSolutions();

    return {solutions, searchSolution, addSolution, updateSolution, getSolution};
}