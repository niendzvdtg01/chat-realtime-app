import { userServiceClient } from "./httpClient";

export const createPrivateConversation = (receiverId) => {
    return userServiceClient.post("/get_messages", { receiverId });
}
