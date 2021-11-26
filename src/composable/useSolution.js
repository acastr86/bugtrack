import {ref} from "vue";
import { nanoid } from "nanoid";
import { useBug } from "./useBug";

const {bugs} = useBug();

const temp = [
    {
        id: nanoid(),
        description: "change dialing rule",
        solvedDate: '2021-11-25',
        solvedBy: "Bob",
        bugID : bugs.value.filter(x => x.status == "Pending")[0].id
    },
    {
        id: nanoid(),
        description: "update scheduling feature",
        solvedDate: '2021-10-13',
        solvedBy: "Bob",
        bugID : bugs.value.filter(x => x.status == "Pending")[1].id
    }
];

const solutions = ref([]);

export const useSolution = () => {

    solutions.value = [...temp];

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
        const newSolution = {id: nanoid(), ...solution};
        temp.push(newSolution);
        solutions.value = [...temp];
        return {newSolution};

    };

    const getSolution = (id) =>{

        return solutions.value.find(x => x.id === id);
    };

    return {solutions, searchSolution, addSolution, updateSolution, getSolution};
}