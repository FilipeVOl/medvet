import axios from "axios";

export async function createEnchiridion(allDataState) {
    try {
        const data  = await axios.post("http://localhost:3333/create/enchiridion", allDataState)
        return data;
    } catch(e) {
        return e
    }
}

export async function getEnchiridion(set) {
    try {
        const prontuarios = await axios.get("http://localhost:3333/get/enchiridion?numberOfItems=10&page=1");
        set(prontuarios.data);
    } catch(e) {
        console.log(e)
    }
}