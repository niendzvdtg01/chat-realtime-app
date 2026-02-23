import axios from "axios";

const BASE_URL = "http://localhost:8080/user/find_user";

export const findUser = (keyword) => {
    return axios.get(BASE_URL, {
        params: {
            keyword: keyword
        },
        withCredentials: true
    })
}