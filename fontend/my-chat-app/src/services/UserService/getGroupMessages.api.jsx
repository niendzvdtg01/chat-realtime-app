import axios from "axios"

const BASE_URL = "http://localhost:8080/api/group/get_messages"
export const getGroupMessages = (conversationId) => {
    return axios.get(BASE_URL, {
        withCredentials: true,
        params: { conversationId: conversationId }
    })
}