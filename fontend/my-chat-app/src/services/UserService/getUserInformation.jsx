import axios from "axios"

const BASE_URL = "http://localhost:8080/user/get_userinfo"
export const getUserInfo = () => {
    return axios.get(BASE_URL, {
        withCredentials: true
    })
}