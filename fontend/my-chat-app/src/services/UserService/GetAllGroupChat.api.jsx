import axios from "axios"

const BASE_URL = "http://localhost:8080/api/group/get_group"
export const getGroup = () => {
    return axios.get(BASE_URL, {
        withCredentials: true
    })
}