import axios from "axios";

const BASE_URL = "http://localhost:8080/auth/login";
export const login = (data) => {
    return axios.post(BASE_URL, data, {
        withCredentials: true
    });
}