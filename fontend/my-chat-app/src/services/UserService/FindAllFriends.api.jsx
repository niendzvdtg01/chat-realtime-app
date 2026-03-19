import axios from "axios"

const BASE_URL = "http://localhost:8080/user/find_all_friends"

export const getAllFriends = () => {
    return axios.get(BASE_URL, {
        withCredentials: true
    })
}