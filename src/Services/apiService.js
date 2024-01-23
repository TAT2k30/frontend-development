import { baseUrl } from "../Assets/Data/baseUrl";
import axios from "axios";

const getItem = async () => {
    try {
        const response = await axios.get(`${baseUrl}/User`);
        console.log("Response:", response.data);
    } catch (error) {
        console.log("Error:", error);
    }
}

const getItemById = (id) => {
   
}

export {
    getItem,
    getItemById,
};
