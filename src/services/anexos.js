import axios from "axios";

const createAnexo = async (animal_id, file) => {
    const formData = new FormData();
    formData.append("animal_id", animal_id);
    formData.append("file", file);

    try {
        const response = await axios.post("http://localhost:3333/create/attachments", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to create Anexo");
    }
};

export default createAnexo;