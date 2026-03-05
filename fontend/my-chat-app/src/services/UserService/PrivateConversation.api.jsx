import axios from "axios";

const BASE_URL = "http://localhost:8080/get_messages";

export const createPrivateConversation = (receiverId) => {
    return axios.post(BASE_URL, { receiverId }, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
}