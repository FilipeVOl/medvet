import axios from "axios";

const createAnexo = async (animal_id, file, name) => {
    const formData = new FormData();
    formData.append("animal_id", animal_id);
    formData.append("archive", file);
    formData.append("name", name);


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

const getAnexos = async (id) => {
    const { data } = await axios
        .get(`http://localhost:3333/get/attachments?animal_id=${id}&page=1&numberOfItems=5`);
        console.log(data)
    return data;
}

export { createAnexo, getAnexos };