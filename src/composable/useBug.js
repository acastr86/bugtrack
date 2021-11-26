import {ref} from "vue";
import { nanoid } from "nanoid";
import { useApplication } from "./useApplication";

const {applications} = useApplication();

const temp = [
    {
        id: nanoid(),
        name: "Phone no dialing",
        description: "When number is international the application is not working",
        status: "Pending",
        priority: 5,
        reportedDate: '2021-11-25',
        reportedBy: "Bob Dylan",
        appID: applications.value[0].id
    },
    {
        id: nanoid(),
        name: "Vacation not registered",
        description: "The information of the vacation for the employee is not updated",
        status: "Pending",
        priority: 9,
        reportedDate: '2021-10-20',
        reportedBy: "John Doe",
        appID: applications.value[1].id
    }
];

const bugs = ref([]);

export const useBug = () => {

    bugs.value = [...temp];

    const searchBug = (bugName) => {
        const regex = new RegExp(bugName, 'i');
        bugs.value = temp.filter(x => regex.test(x.name));
    };

    const updateBug = (id, bug) =>{
        const index = temp.findIndex(x => x.id === id);
        temp[index] = {id, ... bug};
        const updatedBug = temp[index];

        bugs.value = [...temp];
        
        return {updatedBug};

    };

    const addBug = (bug) =>{
        const newBug = {id: nanoid(), ...bug};
        temp.push(newBug);
        bugs.value = [...temp];
        return {newBug};

    };

    const getBug = (id) =>{

        return bugs.value.find(x => x.id === id);
    };

    return {bugs, searchBug, addBug, updateBug, getBug};
}