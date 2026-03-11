import axios from "axios";
const BASE_URL = "http://localhost:8080/api/friend_request";

export const FriendRequest = (receiverId) => {
    return axios.post(BASE_URL, { receiverId }, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
}