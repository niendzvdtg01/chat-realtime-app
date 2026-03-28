import { userServiceClient } from "./httpClient";

export const FriendRequest = (receiverId) => {
    return userServiceClient.post("/api/friend_request", { receiverId });
}
