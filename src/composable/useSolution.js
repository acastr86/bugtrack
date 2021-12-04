import {ref} from "vue";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

import { useBug } from "./useBug";

const {bugs} = useBug();

const api = axios.create({
    baseURL:  `${import.meta.env.VITE_BUG_TRACK_API_BASE_URL}/solutions`,
    params: {
        username : import.meta.env.VITE_BUG_TRACK_API_USER,
        password : import.meta.env.VITE_BUG_TRACK_API_PASS
    } 
});


let temp = [];

const solutions = ref([]);

export const useSolution = () => {

    const getSolutions = async () => {
        const response = await api.get("");

        if(response.status === StatusCodes.OK){
            temp = response.data;

            solutions.value = [...temp];
        }
    };


    const searchSolution = (solutionName) => {
        const regex = new RegExp(solutionName, 'i');
        solutions.value = temp.filter(x => regex.test(x.description));
    };

    const updateSolution = async (id, solution) =>{
        const updatedSolution = {...solution};
        const response = await api.put(`/${id}`, updatedSolution);

       
        if(response.status === StatusCodes.OK){
            await getSolutions();
        }

        return {updatedSolution};

    };

    const addSolution = async (solution) =>{
        const newSolution = {...solution};
        const response = await api.post("", newSolution);

       
        if(response.status === StatusCodes.CREATED){
            await getSolutions();
        }

        return {newSolution};

    };

    const getSolution = (id) =>{

        return solutions.value.find(x => x.id == id);
    };

    getSolutions();

    return {solutions, searchSolution, addSolution, updateSolution, getSolution};
}