
import {ref} from "vue";
import { nanoid } from "nanoid";

const temp = [
    {
        id: nanoid(),
        name: "Telemarketing Management",
        description: "Manage the Telemarketing campaign",
        url: "https://tele.app.com",
        type: "business",
    },
    {
        id: nanoid(),
        name: "Resource Management",
        description: "Manage the human resources",
        url: "https://hr.app.com",
        type: "erp",
    }
];

const applications = ref([]);

export const useApplication = () => {

    applications.value = [...temp];

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
        const newApp = {id: nanoid(), ...app};
        temp.push(newApp);
        applications.value = [...temp];
        return {newApp};

    };

    const getApplication = (id) =>{

        return applications.value.find(x => x.id === id);
    };

    return {applications, searchApplication, addApplication, updateApplication, getApplication};
}