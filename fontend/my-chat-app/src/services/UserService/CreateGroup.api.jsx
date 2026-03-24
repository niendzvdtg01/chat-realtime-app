import axios from "axios"

const BASE_URL = "http://localhost:8080/api/group/create_group"

export const createGroup = (data) => {
    return axios.post(BASE_URL, data, {
        withCredentials: true
    })
}