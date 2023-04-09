import axios from "axios";
import config from "../config/apiConfig";


class Api {
    constructor(config) {
        this.url = config.url;
    }
    async products() {
        try {
            const response = await axios.get(`${this.url}/products/`);
            return response.data;
        } catch (error) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    async category() {
        try {
            const response = await axios.get(`${this.url}/products/categories`);
            return response.data;
        } catch (error) {
            console.log(err);
            return Promise.reject(err);
        }
    }
}

const api = new Api(config);

export default api;