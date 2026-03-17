import axios from "axios"
const BASE_URL = "http://localhost:8080/api/find_request"
export const FindRequest = () => {
    return axios.get(BASE_URL, {
        withCredentials: true
    })
}