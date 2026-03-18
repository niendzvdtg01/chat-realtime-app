import axios from "axios";

const BASE_URL = "http://localhost:8080/api/status";
export const SetStatus = (data) => {
    return axios.post(BASE_URL, data, {
        withCredentials: true
    })
}