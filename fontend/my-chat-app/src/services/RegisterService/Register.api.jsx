import axios from 'axios';

const BAS_URL = "http://localhost:8080/user/create_user";

export const Register = (form) => {
    return axios.post(BAS_URL, form, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    })
}