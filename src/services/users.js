import axios from "axios";

export const postSessions = async (data) => {
    try {
        const token = await axios.get('http://localhost:3333/sessions', data);
        return token;
    } catch(e) {
        return null
    }
}
